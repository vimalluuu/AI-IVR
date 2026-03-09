import React from 'react';
import { CallScreen } from './components/CallScreen';
import { ExternalLink } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Broadcast Banner */}
      <div className="bg-primary/10 border-b border-primary/20 p-3 text-center">
        <p className="text-sm max-w-4xl mx-auto leading-relaxed">
          <span className="font-bold text-primary mr-2">Demo Notice:</span>
          Due to temporary Amazon Connect availability issues and Exotel trial call limitations during development, 
          this prototype simulates the phone call interface directly in the website. 
          The backend AI conversation pipeline remains the same and is powered by AWS, Bhashini, and Bedrock.
        </p>
      </div>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <header className="text-center mb-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trust Leaf – AI for Bharat
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-3 text-foreground/80">
            Government Scheme Voice Assistant
          </h2>
          <p className="text-muted-foreground text-lg">
            AI-powered voice assistant helping rural citizens discover government schemes.
          </p>
        </header>

        {/* Video Ad Section */}
        <div className="w-full max-w-2xl mb-12 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
              poster="/vite.svg"
            >
              <source src="/Voice-Flow-System-Mar-9-18-57-07.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
              AD
            </div>
          </div>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <CallScreen />
        </div>

        {/* Scheme Apply - Application Website */}
        <div className="w-full max-w-4xl mt-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Apply for Schemes
            </h2>
            <a 
              href="https://trust-leaf.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
          <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
            <iframe
              src="https://trust-leaf.lovable.app/"
              title="Trust Leaf Application"
              className="w-full h-full"
              allow="accelerometer; ambient-light-sensor; camera; document-domain; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 Trust Leaf. Built for AI for Bharat.</p>
      </footer>
    </div>
  );
}

export default App;
