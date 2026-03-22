import type { Kvp } from "../types";
import kvpManagmentReducer from "../hooks/kvpManagmentReducer";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { loadKvps, saveKvps } from "../storage/kvpStorage";

const initialKvps: Kvp[] = [];

interface KvpContextType {
  kvps: Kvp[];
  addKvp: (kvp: Kvp) => void;
  updateKvp: (kvp: Kvp) => void;
  selectedKvp: Kvp | null;
  setSelectedKvp: (kvp: Kvp | null) => void;
}

const KvpContext = createContext<KvpContextType>({
  kvps: initialKvps,
  addKvp: () => {},
  updateKvp: () => {},
  selectedKvp: null,
  setSelectedKvp: () => {},
});

export const KvpProvider = ({ children }: { children: React.ReactNode }) => {
  const [kvps, setKvps] = useReducer(kvpManagmentReducer, initialKvps, () =>
    loadKvps(),
  );
  const [selectedKvp, setSelectedKvp] = useState<Kvp | null>(null);

  useEffect(() => {
    saveKvps(kvps);
  }, [kvps]);

  const addKvp = (kvp: Kvp) => {
    setKvps({ type: "ADD_KVP", kvp });
    setSelectedKvp(null);
  };

  const updateKvp = (updatedKvp: Kvp) => {
    setKvps({ type: "UPDATE_KVP", kvp: updatedKvp });
    setSelectedKvp(null);
  };

  return (
    <KvpContext.Provider
      value={{ kvps, addKvp, updateKvp, selectedKvp, setSelectedKvp }}
    >
      {children}
    </KvpContext.Provider>
  );
};

export const useKvpContext = () => useContext(KvpContext);
