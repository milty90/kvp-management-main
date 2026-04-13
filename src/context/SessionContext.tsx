import { type Session } from "@supabase/supabase-js";
import React from "react";

const SessionContext = React.createContext<Session | null>(null);

export default SessionContext;
