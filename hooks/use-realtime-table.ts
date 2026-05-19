"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useRealtimeTable(
  table: string,
  callback: () => void,
  event: "*" | "INSERT" | "UPDATE" | "DELETE" = "*"
) {
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        { event, schema: "public", table },
        () => callback()
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [table, callback, event]);
}
