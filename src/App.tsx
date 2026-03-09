import React from 'react';
import { CallScreen } from './components/CallScreen';

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

        <div className="w-full max-w-md animate-fade-in">
          <CallScreen />
        </div>
      </main>

      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 Trust Leaf. Built for AI for Bharat.</p>
      </footer>
    </div>
  );
}

export default App;
