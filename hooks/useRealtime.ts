"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, subscribeToAppointments, subscribeToCalls } from "@/lib/supabase";
import type { Appointment, Call } from "@/lib/types";

// Hook for real-time appointment updates
export function useRealtimeAppointments(initialAppointments: Appointment[]) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  useEffect(() => {
    const channel = subscribeToAppointments((payload) => {
      if (payload.eventType === "INSERT" && payload.new) {
        setAppointments((prev) => [...prev, payload.new as Appointment]);
      } else if (payload.eventType === "UPDATE" && payload.new) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === (payload.new as Appointment).id
              ? (payload.new as Appointment)
              : apt
          )
        );
      } else if (payload.eventType === "DELETE" && payload.old) {
        setAppointments((prev) =>
          prev.filter((apt) => apt.id !== (payload.old as Appointment).id)
        );
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  }, []);

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  }, []);

  const removeAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, []);

  return {
    appointments,
    addAppointment,
    updateAppointment,
    removeAppointment,
  };
}

// Hook for real-time call updates
export function useRealtimeCalls(initialCalls: Call[]) {
  const [calls, setCalls] = useState<Call[]>(initialCalls);

  useEffect(() => {
    setCalls(initialCalls);
  }, [initialCalls]);

  useEffect(() => {
    const channel = subscribeToCalls((payload) => {
      if (payload.eventType === "INSERT" && payload.new) {
        setCalls((prev) => [payload.new as Call, ...prev]);
      } else if (payload.eventType === "UPDATE" && payload.new) {
        setCalls((prev) =>
          prev.map((call) =>
            call.id === (payload.new as Call).id
              ? (payload.new as Call)
              : call
          )
        );
      } else if (payload.eventType === "DELETE" && payload.old) {
        setCalls((prev) =>
          prev.filter((call) => call.id !== (payload.old as Call).id)
        );
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addCall = useCallback((call: Call) => {
    setCalls((prev) => [call, ...prev]);
  }, []);

  const updateCall = useCallback((id: string, updates: Partial<Call>) => {
    setCalls((prev) =>
      prev.map((call) => (call.id === id ? { ...call, ...updates } : call))
    );
  }, []);

  const removeCall = useCallback((id: string) => {
    setCalls((prev) => prev.filter((call) => call.id !== id));
  }, []);

  return {
    calls,
    addCall,
    updateCall,
    removeCall,
  };
}

