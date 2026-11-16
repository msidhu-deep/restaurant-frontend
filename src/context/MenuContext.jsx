// MenuContext - stores the menu so admin can change it
import { createContext, useContext, useState } from "react";
import menuData from "../data/menuData";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  // start with the hardcoded items from menuData.js
  const [menuItems, setMenuItems] = useState(menuData);

  // add a new item (give it a unique id)
  function addMenuItem(item) {
    setMenuItems([...menuItems, { ...item, id: Date.now() }]);
  }

  // replace an item with the edited version
  function updateMenuItem(id, updatedItem) {
    setMenuItems(
      menuItems.map((m) => (m.id === id ? { ...m, ...updatedItem } : m)),
    );
  }

  // delete an item
  function deleteMenuItem(id) {
    setMenuItems(menuItems.filter((m) => m.id !== id));
  }

  return (
    <MenuContext.Provider
      value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// shortcut so other files can write useMenu()
export function useMenu() {
  return useContext(MenuContext);
}
