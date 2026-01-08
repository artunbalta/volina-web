"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Ömer Burak Avcıoğlu",
    role: "Co-Founder",
    specialty: "Product",
    image: "/team/omer.jpg",
    initials: "OA",
    color: "#0055FF",
    bio: "",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fatih Aydın",
    role: "Co-Founder",
    specialty: "Engineering",
    image: "/team/fatih.jpg",
    initials: "FA",
    color: "#10B981",
    bio: "",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Artun Balta",
    role: "Co-Founder",
    specialty: "Development",
    image: "/team/artun.jpg",
    initials: "AB",
    color: "#F59E0B",
    bio: "",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Berke Pekşen",
    role: "Co-Founder",
    specialty: "Design",
    image: "/team/berke.jpg",
    initials: "BP",
    color: "#8B5CF6",
    bio: "",
    linkedin: "#",
    twitter: "#",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet the Team
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name} 
              className="group overflow-hidden bg-gray-900/50 hover:bg-gray-900/70 border-gray-800 hover:border-blue-500/30 transition-all duration-300"
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="relative"
                    style={{ 
                      filter: `drop-shadow(0 4px 20px ${member.color}30)` 
                    }}
                  >
                    <Avatar className="w-24 h-24 ring-4 ring-gray-800">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback 
                        className="text-xl font-bold text-white"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    {/* Specialty badge */}
                    <div 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.specialty}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-white/60 mb-4">
                      {member.bio}
                    </p>
                  )}

                  {/* Social links */}
                  <div className="flex justify-center gap-3">
                    <a 
                      href={member.linkedin}
                      className="p-2 text-white/40 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href={member.twitter}
                      className="p-2 text-white/40 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

