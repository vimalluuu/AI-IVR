import { useState, useRef, useEffect, useCallback } from 'react';
import { blobToBase64, convertToWav, base64ToBlob } from '../utils/audio';

export type CallStatus = 'IDLE' | 'RINGING' | 'CONNECTED' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'DISCONNECTED';

export interface TranscriptItem {
  role: 'user' | 'assistant';
  text: string;
}

const API_ENDPOINT = 'https://f3fxn1ltk8.execute-api.us-east-1.amazonaws.com/query';

export function useVoiceCall() {
  const [status, setStatus] = useState<CallStatus>('IDLE');
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const recordingTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setDuration(0);
  }, [stopTimer]);

  const startCall = useCallback(() => {
    setStatus('RINGING');
    // Simulate ringing for 2 seconds
    setTimeout(() => {
      setStatus('CONNECTED');
      startTimer();
    }, 2000);
  }, [startTimer]);

  const endCall = useCallback(() => {
    setStatus('DISCONNECTED');
    setIsRecording(false);
    resetTimer();
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null; // Prevent auto-restart after hang up
    }
    // Final disconnect after message
    setTimeout(() => setStatus('IDLE'), 1000);
  }, [resetTimer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        if (recordingTimeoutRef.current) {
          clearTimeout(recordingTimeoutRef.current);
          recordingTimeoutRef.current = null;
        }
        const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setStatus('THINKING');
        
        try {
          // Convert to WAV as required by API
          const wavBlob = await convertToWav(webmBlob);
          const base64Audio = await blobToBase64(wavBlob);
          
          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio_base64: base64Audio }),
          });
          
          const data = await response.json();
          
          if (data.query) {
            setTranscript((prev) => [...prev, { role: 'user', text: data.query }]);
          }
          
          if (data.answer) {
            setTranscript((prev) => [...prev, { role: 'assistant', text: data.answer }]);
            if (data.audio_base64) {
              playResponse(data.audio_base64);
            } else {
              setStatus('CONNECTED');
            }
          } else {
            setStatus('CONNECTED');
          }
        } catch (error) {
          console.error('API Error:', error);
          setStatus('CONNECTED');
        }
      };

      recorder.start();
      setIsRecording(true);
      setStatus('LISTENING');

      // Add 5-second limit as suggested
      recordingTimeoutRef.current = window.setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
          setIsRecording(false);
        }
      }, 5000);
    } catch (error) {
      console.error('Recording Error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playResponse = (base64: string) => {
    const blob = base64ToBlob(base64, 'audio/wav');
    const url = URL.createObjectURL(blob);

    // Prevent audio overlap — stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioRef.current) {
      audioRef.current.src = url;
      
      // Setup Analyser
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
      
      const updateVisualizer = () => {
        if (analyserRef.current && audioRef.current && !audioRef.current.paused) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(dataArray);
          animationFrameRef.current = requestAnimationFrame(updateVisualizer);
        }
      };
      
      audioRef.current.play().then(() => {
        setStatus('SPEAKING');
        updateVisualizer();
      });
      
      audioRef.current.onended = () => {
        setAudioData(new Uint8Array(0));
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        URL.revokeObjectURL(url);
        // Auto-resume listening after AI finishes speaking
        startRecording();
      };
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    return () => {
      stopTimer();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopTimer]);

  return {
    status,
    transcript,
    duration,
    isRecording,
    audioData,
    startCall,
    endCall,
    startRecording,
    stopRecording,
  };
}
