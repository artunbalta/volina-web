"use client";

import { 
  Calendar, 
  Phone, 
  BarChart3, 
  Clock, 
  Shield, 
  Zap,
  MessageSquare,
  Bot
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Phone,
    title: "24/7 Voice Support",
    description: "AI handles calls around the clock, ensuring customers always reach a helpful assistant.",
    color: "#0055FF",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automatically book, reschedule, and cancel appointments with intelligent conflict detection.",
    color: "#10B981",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Human-like dialogue that understands context, handles interruptions, and shows empathy.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights into call volume, sentiment analysis, and appointment trends.",
    color: "#F59E0B",
  },
  {
    icon: Clock,
    title: "Instant Response",
    description: "Zero wait times for customers. Every call answered in under 2 seconds.",
    color: "#EC4899",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Enterprise-grade security with full compliance for data protection across all industries.",
    color: "#06B6D4",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Connect with your existing CRM, scheduling systems, and business tools via API.",
    color: "#EF4444",
  },
  {
    icon: Bot,
    title: "Continuous Learning",
    description: "AI improves with every call, adapting to your business's unique needs.",
    color: "#84CC16",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to transform your customer communication
            into a seamless, AI-powered experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group bg-gray-900/50 hover:bg-gray-900/70 border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid sm:grid-cols-3 gap-8">
          {[
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "<2s", label: "Average Response Time" },
            { value: "50K+", label: "Calls Handled Daily" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

