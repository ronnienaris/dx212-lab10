import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Menu } from "./logic";
import { supabase } from "./supabase";

type MenuContextValue = {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  reload: () => void;
  addMenu: (menu: Omit<Menu, "id">) => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("menu_list")
        .select("*")
        .order("price");

      if (error) {
        setError(error.message);
      } else {
        setMenus(data as Menu[]);
        setError(null);
      }
      setLoading(false);
    }
    load();
  }, [reloadCount]);

  const reload = () => {
    setLoading(true);
    setReloadCount(reloadCount + 1);
  };

  const addMenu = (menu: Omit<Menu, "id">) => {
    setMenus([...menus, { ...menu, id: Date.now() }]);
  };

  return (
    <MenuContext.Provider value={{ menus, loading, error, reload, addMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenus() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenus ต้องอยู่ภายใน <MenuProvider>");
  return ctx;
}
