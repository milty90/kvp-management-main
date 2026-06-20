import type { InsertKvp, Kvp } from "../types";
import { useSessionContext } from "./SessionContext";
import kvpManagmentReducer from "../features/kvpManagmentReducer";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getKvpsfromDataBase,
  deleteKvpFromDataBase,
  addKvpToDataBase,
  updateKvpInDataBase,
  rejectKvpInDataBase,
  archiveKvpInDataBase,
} from "../storage/kvpDatabase";

interface KvpContextType {
  kvps: Kvp[];
  addKvp: (kvp: InsertKvp) => Promise<void>;
  updateKvp: (kvp: Kvp) => Promise<void>;
  deleteKvp: (id: number) => Promise<void>;
  selectedKvp: Kvp | null;
  setSelectedKvp: (kvp: Kvp | null) => void;
  archiveKvp: (id: number) => Promise<void>;
  rejectKvp: (id: number) => Promise<void>;
  isLoading: boolean;
}

const KvpContext = createContext<KvpContextType>({
  kvps: [],
  addKvp: () => Promise.resolve(),
  updateKvp: () => Promise.resolve(),
  deleteKvp: () => Promise.resolve(),
  selectedKvp: null,
  setSelectedKvp: () => {},
  archiveKvp: () => Promise.resolve(),
  rejectKvp: () => Promise.resolve(),
  isLoading: false,
});

export const KvpProvider = ({ children }: { children: React.ReactNode }) => {
  const [kvps, setKvps] = useReducer(kvpManagmentReducer, []);
  const [selectedKvp, setSelectedKvp] = useState<Kvp | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);
    if (session) {
      getKvpsfromDataBase().then((data) => {
        setKvps({ type: "SET_KVPS", kvps: data });
        setIsLoading(false);
      });
    } else {
      setKvps({ type: "SET_KVPS", kvps: [] });
      setIsLoading(false);
    }
  }, [session]);

  const addKvp = useCallback(async (kvp: InsertKvp) => {
    try {
      await addKvpToDataBase(kvp);

      setKvps({ type: "ADD_KVP", kvp });

      setSelectedKvp(null);
    } catch (error) {
      console.error("Error adding KVP:", error);
    }
  }, []);

  const updateKvp = useCallback(async (updatedKvp: Kvp) => {
    try {
      await updateKvpInDataBase(updatedKvp);
      setKvps({ type: "UPDATE_KVP", kvp: updatedKvp });

      setSelectedKvp(null);
    } catch (error) {
      console.error("Error updating KVP:", error);
    }
  }, []);

  const deleteKvp = useCallback(async (id: number) => {
    try {
      await deleteKvpFromDataBase(id);
      setKvps({ type: "DELETE_KVP", kvp: { id } as Kvp });
      setSelectedKvp(null);
    } catch (error) {
      console.error("Error deleting KVP:", error);
    }
  }, []);

  const archiveKvp = useCallback(async (id: number) => {
    try {
      await archiveKvpInDataBase(id);

      setKvps({ type: "ARCHIVE_KVP", kvp: { id } as Kvp });

      setSelectedKvp(null);
    } catch (error) {
      console.error("Error archiving KVP:", error);
    }
  }, []);

  const rejectKvp = useCallback(async (id: number) => {
    try {
      await rejectKvpInDataBase(id);
      setKvps({ type: "REJECT_KVP", kvp: { id } as Kvp });

      setSelectedKvp(null);
    } catch (error) {
      console.error("Error rejecting KVP:", error);
    }
  }, []);

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
        isLoading,
      }}
    >
      {children}
    </KvpContext.Provider>
  );
};

export const useKvpContext = () => useContext(KvpContext);
