"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTheme } from "@/components/providers/ThemeProvider";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Save,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@volina.org",
    phone: "+1 (555) 123-4567",
    company: "Volina AI",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <User className="w-5 h-5" />
              Profile
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-300">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="dark:text-gray-300">Company</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Globe className="w-5 h-5" />
              Appearance
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Customize how the dashboard looks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                  theme === "light"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                )}
              >
                <Sun className={cn("w-5 h-5", theme === "light" ? "text-primary" : "text-gray-500")} />
                <span className={cn("font-medium", theme === "light" ? "text-primary" : "text-gray-600 dark:text-gray-300")}>
                  Light
                </span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                  theme === "dark"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                )}
              >
                <Moon className={cn("w-5 h-5", theme === "dark" ? "text-primary" : "text-gray-500")} />
                <span className={cn("font-medium", theme === "dark" ? "text-primary" : "text-gray-600 dark:text-gray-300")}>
                  Dark
                </span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Choose how you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push Notifications", desc: "Receive push notifications in browser" },
              { key: "sms", label: "SMS Notifications", desc: "Receive text message alerts" },
            ].map((item) => (
              <div 
                key={item.key} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ 
                    ...notifications, 
                    [item.key]: !notifications[item.key as keyof typeof notifications] 
                  })}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                      notifications[item.key as keyof typeof notifications]
                        ? "translate-x-7"
                        : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Manage your security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="dark:text-gray-300">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="dark:text-gray-300">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="dark:text-gray-300">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[120px]">
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

