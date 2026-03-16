import { createContext, useContext, useState } from "react";
import type { Kvp } from "../types";

interface KvpContextType {
  kvps: Kvp[];
  addKvp: (kvp: Kvp) => void;
}

const KvpContext = createContext<KvpContextType>({
  kvps: [],
  addKvp: () => {},
});

export const KvpProvider = ({ children }: { children: React.ReactNode }) => {
  const [kvps, setKvps] = useState<Kvp[]>([]);

  const addKvp = (kvp: Kvp) => {
    setKvps((prevKvps) => [...prevKvps, kvp]);
  };

  return (
    <KvpContext.Provider value={{ kvps, addKvp }}>
      {children}
    </KvpContext.Provider>
  );
};

export const useKvpContext = () => useContext(KvpContext);
