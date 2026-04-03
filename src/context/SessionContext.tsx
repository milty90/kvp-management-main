import { type Session } from "react-router-dom";
import React from "react";

const SessionContext = React.createContext<Session | null>(null);

export default SessionContext;
