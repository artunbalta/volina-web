"use client";

import { useEffect, useState, useCallback } from "react";
import { KPICards } from "@/components/dashboard/KPICards";
import { Charts } from "@/components/dashboard/Charts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { format, subDays } from "date-fns";

// Mock data generator functions
const generateKPIData = () => ({
  monthlyCalls: Math.floor(Math.random() * 500) + 1000,
  monthlyChange: Math.floor(Math.random() * 20) - 5,
  dailyCalls: Math.floor(Math.random() * 30) + 30,
  dailyChange: Math.floor(Math.random() * 15) - 3,
  avgDuration: Math.floor(Math.random() * 60) + 120,
  durationChange: Math.floor(Math.random() * 10) - 5,
  appointmentRate: Math.floor(Math.random() * 20) + 60,
  appointmentRateChange: Math.floor(Math.random() * 10) - 2,
});

const generateCallTypeData = () => [
  { name: "Appointments", value: Math.floor(Math.random() * 300) + 600, color: "#0055FF" },
  { name: "Inquiries", value: Math.floor(Math.random() * 150) + 200, color: "#8B5CF6" },
  { name: "Follow-ups", value: Math.floor(Math.random() * 50) + 50, color: "#F59E0B" },
  { name: "Cancellations", value: Math.floor(Math.random() * 30) + 20, color: "#EF4444" },
];

const generateDailyActivityData = () => 
  Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), 6 - i), "EEE"),
    calls: Math.floor(Math.random() * 50) + 30,
    appointments: Math.floor(Math.random() * 30) + 15,
  }));

const generateRecentActivity = () => [
  {
    id: "1",
    type: "appointment" as const,
    description: "New appointment scheduled with Sarah Chen for Maria Garcia",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sentiment: "positive" as const,
  },
  {
    id: "2",
    type: "inquiry" as const,
    description: "Customer inquired about office hours and service availability",
    timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
    sentiment: "neutral" as const,
  },
  {
    id: "3",
    type: "call" as const,
    description: "Urgent appointment booked with Emily Watson for same-day visit",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    sentiment: "positive" as const,
  },
  {
    id: "4",
    type: "cancellation" as const,
    description: "John Smith cancelled tomorrow's appointment with Torres",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    sentiment: "neutral" as const,
  },
  {
    id: "5",
    type: "appointment" as const,
    description: "Follow-up visit scheduled with Michael Torres for consultation",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    sentiment: "positive" as const,
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [callTypeData, setCallTypeData] = useState(generateCallTypeData());
  const [dailyActivityData, setDailyActivityData] = useState(generateDailyActivityData());
  const [recentActivity, setRecentActivity] = useState(generateRecentActivity());

  const loadData = useCallback(() => {
    setKpiData(generateKPIData());
    setCallTypeData(generateCallTypeData());
    setDailyActivityData(generateDailyActivityData());
    setRecentActivity(generateRecentActivity());
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    loadData();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s your AI voice agent overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {format(lastUpdated, "h:mm a")}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards data={kpiData} />

      {/* Charts */}
      <Charts 
        callTypeData={callTypeData} 
        dailyActivityData={dailyActivityData} 
      />

      {/* Recent Activity & Performance */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivity} />
        </div>
        
        {/* Quick Stats Card */}
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-4">AI Performance</h3>
          <div className="space-y-4">
            {[
              { label: "Call Completion Rate", value: "98.5%" },
              { label: "Appointment Conversion", value: `${kpiData.appointmentRate}%` },
              { label: "Customer Satisfaction", value: "94%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="opacity-80">{stat.label}</span>
                  <span className="font-medium">{stat.value}</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500" 
                    style={{ width: stat.value }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/20">
            <p className="text-sm opacity-80">
              Your AI is performing <span className="font-semibold text-white">above average</span> compared to similar businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
