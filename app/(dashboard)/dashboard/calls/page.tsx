"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Filter, Download, RefreshCw, X, Check } from "lucide-react";
import { CallsTable } from "@/components/dashboard/CallsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Call } from "@/lib/types";

// Mock data
const mockCalls: Call[] = [
  {
    id: "1",
    vapi_call_id: "vapi_call_001",
    appointment_id: null,
    recording_url: "https://api.vapi.ai/recordings/sample1.mp3",
    transcript: "Agent: Hello, this is Volina AI. How can I help you today?\nCaller: Hi, I'd like to schedule an appointment.\nAgent: Of course! I have availability tomorrow at 9 AM or 2 PM. Which works better?\nCaller: 9 AM works great.\nAgent: Perfect! Your appointment is confirmed for tomorrow at 9 AM.",
    summary: "Customer scheduled an appointment for 9 AM tomorrow.",
    sentiment: "positive",
    duration: 145,
    type: "appointment",
    caller_phone: "+1 (555) 111-0002",
    metadata: {},
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    vapi_call_id: "vapi_call_002",
    appointment_id: null,
    recording_url: "https://api.vapi.ai/recordings/sample2.mp3",
    transcript: "Agent: Hello, this is Volina AI. How can I help you today?\nCaller: I have a question about your services.\nAgent: Of course! What would you like to know?\nCaller: What are your operating hours?\nAgent: We're open Monday to Friday, 9 AM to 6 PM.",
    summary: "Customer inquired about operating hours.",
    sentiment: "neutral",
    duration: 98,
    type: "inquiry",
    caller_phone: "+1 (555) 444-5555",
    metadata: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    vapi_call_id: "vapi_call_003",
    appointment_id: null,
    recording_url: "https://api.vapi.ai/recordings/sample3.mp3",
    transcript: "Agent: Hello, this is Volina AI. How can I help you today?\nCaller: I need to see someone as soon as possible.\nAgent: I can help with that. We have an opening today at 1 PM. Would that work?\nCaller: Yes, that's perfect!\nAgent: Great! Your appointment is confirmed for 1 PM today.",
    summary: "Urgent appointment scheduled for same day at 1 PM.",
    sentiment: "positive",
    duration: 112,
    type: "appointment",
    caller_phone: "+1 (555) 333-0002",
    metadata: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "4",
    vapi_call_id: "vapi_call_004",
    appointment_id: null,
    recording_url: "https://api.vapi.ai/recordings/sample4.mp3",
    transcript: "Agent: Hello, this is Volina AI. How can I help you today?\nCaller: I need to cancel my appointment.\nAgent: I understand. Can you provide your name and appointment date?\nCaller: John Smith, tomorrow at 3 PM.\nAgent: I've cancelled your appointment. Would you like to reschedule?\nCaller: No, I'll call back later.",
    summary: "John Smith cancelled their appointment scheduled for tomorrow.",
    sentiment: "neutral",
    duration: 87,
    type: "cancellation",
    caller_phone: "+1 (555) 111-0001",
    metadata: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "5",
    vapi_call_id: "vapi_call_005",
    appointment_id: null,
    recording_url: "https://api.vapi.ai/recordings/sample5.mp3",
    transcript: "Agent: Hello, this is Volina AI. How can I help you today?\nCaller: I want to book a consultation.\nAgent: I have availability this Thursday at 11 AM.\nCaller: That works for me.\nAgent: Wonderful! Your consultation is confirmed for Thursday at 11 AM.",
    summary: "Consultation booked for Thursday at 11 AM.",
    sentiment: "positive",
    duration: 134,
    type: "appointment",
    caller_phone: "+1 (555) 222-0001",
    metadata: {},
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const filterOptions = {
  type: ["appointment", "inquiry", "cancellation", "follow-up"],
  sentiment: ["positive", "neutral", "negative"],
};

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    type: string[];
    sentiment: string[];
  }>({ type: [], sentiment: [] });
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCalls(mockCalls);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCalls(mockCalls);
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ["Date", "Type", "Phone", "Duration", "Sentiment", "Summary"];
    const rows = filteredCalls.map(call => [
      new Date(call.created_at).toLocaleString(),
      call.type,
      call.caller_phone || "N/A",
      `${Math.floor((call.duration || 0) / 60)}:${((call.duration || 0) % 60).toString().padStart(2, "0")}`,
      call.sentiment || "N/A",
      call.summary || "N/A"
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
    
    // Create download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `call-logs-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  const toggleFilter = (category: "type" | "sentiment", value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ type: [], sentiment: [] });
  };

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          call.summary?.toLowerCase().includes(query) ||
          call.transcript?.toLowerCase().includes(query) ||
          call.caller_phone?.toLowerCase().includes(query) ||
          call.type.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      // Type filter
      if (activeFilters.type.length > 0 && !activeFilters.type.includes(call.type)) {
        return false;
      }
      
      // Sentiment filter
      if (activeFilters.sentiment.length > 0 && call.sentiment && !activeFilters.sentiment.includes(call.sentiment)) {
        return false;
      }
      
      return true;
    });
  }, [calls, searchQuery, activeFilters]);

  const activeFilterCount = activeFilters.type.length + activeFilters.sentiment.length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="h-[600px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Call Logs</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and analyze all voice interactions handled by Volina AI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button 
            variant="outline"
            onClick={handleExport}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            {exportSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Exported!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by transcript, summary, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button 
          variant="outline"
          onClick={() => setShowFilters(true)}
          className={cn(
            "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300",
            activeFilterCount > 0 && "border-primary text-primary"
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          {activeFilters.type.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter("type", filter)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize"
            >
              {filter}
              <X className="w-3 h-3" />
            </button>
          ))}
          {activeFilters.sentiment.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter("sentiment", filter)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize"
            >
              {filter}
              <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredCalls.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-primary">
            {filteredCalls.filter((c) => c.type === "appointment").length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Appointments</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {filteredCalls.filter((c) => c.sentiment === "positive").length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Positive</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
            {filteredCalls.length > 0 
              ? `${Math.round(filteredCalls.reduce((acc, c) => acc + (c.duration || 0), 0) / filteredCalls.length / 60)}m`
              : "0m"
            }
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Duration</p>
        </div>
      </div>

      {/* Table */}
      <CallsTable calls={filteredCalls} />

      {/* Filter Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Filter Calls</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Call Type</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.type.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("type", type)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                      activeFilters.type.includes(type)
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sentiment</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.sentiment.map(sentiment => (
                  <button
                    key={sentiment}
                    onClick={() => toggleFilter("sentiment", sentiment)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                      activeFilters.sentiment.includes(sentiment)
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {sentiment}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={clearFilters} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              Clear All
            </Button>
            <Button onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
