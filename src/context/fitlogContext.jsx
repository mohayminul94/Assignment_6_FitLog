"use client";

import { createContext, useContext, useState } from "react";

const FitlogContext = createContext(null);

export function FitlogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(true);

  return (
    <FitlogContext.Provider
      value={{ plan, setPlan, saved, setSaved, ready }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error("useFitlog must be used inside FitlogProvider");
  }

  return context;
}