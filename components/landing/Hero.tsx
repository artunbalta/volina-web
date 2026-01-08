"use client";

import { useState, useCallback, Suspense } from "react";
import { MicOff, Phone, PhoneOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startVoiceCall, stopVoiceCall, cleanupVapiListeners } from "@/lib/vapi";
import RobotScene from "./RobotScene";

export function Hero() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);

  const handleStartCall = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      await startVoiceCall({
        onCallStart: () => {
          setIsConnecting(false);
          setIsCallActive(true);
        },
        onCallEnd: () => {
          setIsCallActive(false);
          setIsSpeaking(false);
          setVolume(0);
        },
        onSpeechStart: () => {
          setIsSpeaking(true);
        },
        onSpeechEnd: () => {
          setIsSpeaking(false);
        },
        onVolumeLevel: (vol) => {
          setVolume(vol);
        },
        onError: (error) => {
          console.error("Vapi error:", error);
          setIsConnecting(false);
          setIsCallActive(false);
        },
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setIsConnecting(false);
    }
  }, []);

  const handleEndCall = useCallback(() => {
    stopVoiceCall();
    cleanupVapiListeners();
    setIsCallActive(false);
    setIsSpeaking(false);
    setVolume(0);
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById("demo");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Background Layer (Z-0): Massive VOLINA typography */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <h1 className="text-[20vw] md:text-[25vw] font-black text-primary-50/30 tracking-tighter leading-none">
          VOLINA
        </h1>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Interactive Layer (Z-10): Spline 3D Robot */}
      <div className="absolute inset-0 z-10 spline-container">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        }>
          <RobotScene />
        </Suspense>
      </div>

      {/* Voice indicator overlay - appears when call is active */}
      {isCallActive && (
        <div className="absolute inset-0 z-15 pointer-events-none">
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full transition-all duration-200 ${
              isSpeaking ? "bg-primary/20 scale-110" : "bg-primary/10 scale-100"
            }`}
            style={{
              transform: `translate(-50%, -50%) scale(${1 + volume * 0.5})`,
              opacity: 0.3 + volume * 0.4,
            }}
          />
        </div>
      )}

      {/* UI Layer (Z-20): Content and buttons */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Spacer for header */}
        <div className="h-16" />

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero text - positioned at top */}
          <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-600">AI-Powered Voice Agent</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
              Meet Your New
              <br />
              <span className="text-primary">Healthcare Assistant</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Volina AI handles patient calls 24/7, schedules appointments, and answers inquiries 
              with human-like conversation.
            </p>
          </div>

          {/* Spacer to push buttons lower */}
          <div className="flex-1" />

          {/* CTA Buttons - positioned at bottom */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-fade-in animate-delay-200">
            {/* Try Volina Button */}
            <Button
              size="xl"
              onClick={isCallActive ? handleEndCall : handleStartCall}
              disabled={isConnecting}
              className={`min-w-[200px] ${
                isCallActive 
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/25" 
                  : isConnecting
                  ? "bg-primary/70"
                  : "animate-pulse-glow"
              }`}
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : isCallActive ? (
                <>
                  <PhoneOff className="w-5 h-5" />
                  End Call
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Try Volina
                </>
              )}
            </Button>

            <Button
              size="xl"
              variant="outline"
              onClick={scrollToDemo}
            >
              Book a Demo
            </Button>
          </div>

          {/* Active call indicator */}
          {isCallActive && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100 animate-fade-in">
              <div className={`w-3 h-3 rounded-full ${isSpeaking ? "bg-green-500 voice-active" : "bg-primary"}`} />
              <span className="text-sm font-medium text-gray-700">
                {isSpeaking ? "Volina is listening..." : "Speak to Volina"}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleEndCall}
              >
                <MicOff className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}

