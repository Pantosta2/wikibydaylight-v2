"use client";

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
} from "react";

interface NavigationContextProps {
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <NavigationContext.Provider value={{ isPending, startTransition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
