import type { Kvp } from "../types";
import kvpManagmentReducer from "../features/kvpManagmentReducer";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  deleteKvpFromDataBase,
  getKvpsfromDataBase,
  setKvpsToDataBase,
} from "../storage/kvpDatabase";
import { supabase } from "../utils/supabase";

interface KvpContextType {
  kvps: Kvp[];
  addKvp: (kvp: Kvp) => void;
  updateKvp: (kvp: Kvp) => void;
  deleteKvp: (id: number) => void;
  selectedKvp: Kvp | null;
  setSelectedKvp: (kvp: Kvp | null) => void;
  archiveKvp: (id: number) => void;
  rejectKvp: (id: number) => void;
}

const KvpContext = createContext<KvpContextType>({
  kvps: [],
  addKvp: () => {},
  updateKvp: () => {},
  deleteKvp: () => {},
  selectedKvp: null,
  setSelectedKvp: () => {},
  archiveKvp: () => {},
  rejectKvp: () => {},
});

export const KvpProvider = ({ children }: { children: React.ReactNode }) => {
  const [kvps, setKvps] = useReducer(kvpManagmentReducer, []);
  const [selectedKvp, setSelectedKvp] = useState<Kvp | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getKvpsfromDataBase().then((data) => {
          setKvps({ type: "SET_KVPS", kvps: data });
        });
      } else {
        setKvps({ type: "SET_KVPS", kvps: [] });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const syncKvpsToDatabase = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      setKvpsToDataBase(kvps);
    };
    void syncKvpsToDatabase();
  }, [kvps]);

  const addKvp = (kvp: Kvp) => {
    setKvps({ type: "ADD_KVP", kvp });
    setSelectedKvp(null);
  };

  const updateKvp = (updatedKvp: Kvp) => {
    setKvps({ type: "UPDATE_KVP", kvp: updatedKvp });
    setSelectedKvp(null);
  };

  const deleteKvp = (id: number) => {
    setKvps({ type: "DELETE_KVP", kvp: { id } as Kvp });
    deleteKvpFromDataBase(id);
    setSelectedKvp(null);
  };

  const archiveKvp = (id: number) => {
    setKvps({ type: "ARCHIVE_KVP", kvp: { id } as Kvp });
    setSelectedKvp(null);
  };

  const rejectKvp = (id: number) => {
    setKvps({ type: "REJECT_KVP", kvp: { id } as Kvp });
    setSelectedKvp(null);
  };

  return (
    <KvpContext.Provider
      value={{
        kvps,
        addKvp,
        updateKvp,
        deleteKvp,
        archiveKvp,
        rejectKvp,
        selectedKvp,
        setSelectedKvp,
      }}
    >
      {children}
    </KvpContext.Provider>
  );
};

export const useKvpContext = () => useContext(KvpContext);
