import React, { useRef, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  User, 
  Volume2, 
  Clock, 
  MessageSquare,
  Activity,
  Loader2
} from 'lucide-react';
import { useVoiceCall } from '../hooks/useVoiceCall';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CallScreenProps {
  translations?: {
    readyForCall?: string;
    ringing?: string;
    connected?: string;
    listening?: string;
    thinking?: string;
    speaking?: string;
    callEnded?: string;
    assistantName?: string;
    tapToStart?: string;
  };
}

const defaultTranslations = {
  readyForCall: 'Ready for a call',
  ringing: 'Ringing...',
  connected: 'Connected',
  listening: 'Listening...',
  thinking: 'Thinking...',
  speaking: 'Assistant speaking...',
  callEnded: 'Call Ended',
  assistantName: 'Trust Leaf Assistant',
  tapToStart: "Tap below to start discovering Bharat's government schemes.",
};

export function CallScreen({ translations }: CallScreenProps) {
  const t = { ...defaultTranslations, ...translations };
  const {
    status,
    transcript,
    duration,
    isRecording,
    audioData,
    startCall,
    endCall,
    startRecording,
    stopRecording,
  } = useVoiceCall();

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (status) {
      case 'IDLE': return t.readyForCall;
      case 'RINGING': return t.ringing;
      case 'CONNECTED': return t.connected;
      case 'LISTENING': return t.listening;
      case 'THINKING': return t.thinking;
      case 'SPEAKING': return t.speaking;
      case 'DISCONNECTED': return t.callEnded;
      default: return '';
    }
  };

  if (status === 'IDLE') {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass-dark rounded-3xl h-[600px] border-2 border-primary/20 shadow-2xl animate-fade-in">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse-subtle">
          <Activity className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{t.assistantName}</h3>
        <p className="text-muted-foreground mb-8 text-center">
          {t.tapToStart}
        </p>
        <button
          onClick={startCall}
          className="w-16 h-16 bg-primary hover:bg-primary/80 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-primary/30"
        >
          <Phone className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col glass-dark rounded-3xl h-[600px] border-2 border-primary/20 shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary blur-[100px] rounded-full" />
      </div>

      {/* Top Section */}
      <div className="p-6 text-center z-10">
        <p className="text-primary font-medium mb-1 flex items-center justify-center gap-2">
          {status !== 'RINGING' && status !== 'DISCONNECTED' && (
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          )}
          {getStatusText()}
        </p>
        <h3 className="text-xl font-bold text-white">{t.assistantName}</h3>
        {status !== 'RINGING' && status !== 'DISCONNECTED' && (
          <p className="text-muted-foreground font-mono mt-1 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(duration)}
          </p>
        )}
      </div>

      {/* Center Section - Avatar / Waves */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className={cn(
          "w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center bg-black/40 relative transition-all duration-500",
          (status === 'SPEAKING' || status === 'LISTENING' || status === 'THINKING') && "border-primary scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        )}>
          {status === 'SPEAKING' ? (
            <div className="call-wave gap-1 flex items-center h-12">
              {Array.from(audioData).slice(0, 10).map((val, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-primary rounded-full transition-all duration-75"
                  style={{ height: `${Math.max(4, (val / 255) * 40)}px` }}
                />
              ))}
            </div>
          ) : status === 'THINKING' ? (
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
          ) : (
            <User className={cn(
              "w-16 h-16 text-primary/80",
              status === 'LISTENING' && "animate-pulse"
            )} />
          )}

          {/* Pulsing circles around avatar */}
          {(status === 'SPEAKING' || status === 'LISTENING') && (
            <>
              <div className="absolute inset-0 rounded-full animate-ping border border-primary/40" />
              <div className="absolute inset-[-10px] rounded-full animate-pulse border border-primary/20" />
            </>
          )}
        </div>

        {/* Transcript Overlay */}
        <div className="w-full mt-8 px-6 max-h-[180px] overflow-y-auto scrollbar-hide flex flex-col gap-3">
          {transcript.map((item, i) => (
            <div 
              key={i}
              className={cn(
                "p-3 rounded-2xl text-sm max-w-[85%] animate-fade-in",
                item.role === 'user' 
                  ? "bg-primary/20 self-end border border-primary/30 text-white rounded-br-none" 
                  : "bg-white/10 self-start border border-white/10 text-white/90 rounded-bl-none"
              )}
            >
              <p>{item.text}</p>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      </div>

      {/* Bottom Section - Controls */}
      <div className="p-8 flex items-center justify-around z-10 bg-black/20 backdrop-blur-lg border-t border-white/5">
        {/* Toggle Recording / Mic Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={status === 'RINGING' || status === 'THINKING' || status === 'DISCONNECTED'}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
            isRecording 
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
              : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
          )}
          title={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        {/* Hang Up Button */}
        <button
          onClick={endCall}
          className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-900/20"
          title="Hang Up"
        >
          <PhoneOff className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
