import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

interface SessionContextType {
  session: Session | null;
  authEvent: AuthChangeEvent | null;
  isAuthLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  authEvent: null,
  isAuthLoading: true,
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authEvent, setAuthEvent] = useState<AuthChangeEvent | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setAuthEvent(event);
      setIsAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, authEvent, isAuthLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);

export default SessionContext;
