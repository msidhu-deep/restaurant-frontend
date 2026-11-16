// Menu page - search and filter the menu
import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import MenuItem from "../components/MenuItem";

function Menu() {
  // menu items come from shared state (admin can change them)
  const { menuItems } = useMenu();

  // one state for each filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dietary, setDietary] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  // keep only the items that match every filter
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    const matchesDietary = dietary === "All" || item.dietary.includes(dietary);
    const matchesPrice = maxPrice === "" || item.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesDietary && matchesPrice;
  });

  return (
    <div>
      <h1>Our Menu</h1>

      {/* allergen note */}
      <p className="disclaimer">
        Allergies? Please ask our staff before ordering. Dietary tags are a
        guide only, and our kitchen handles nuts, gluten, and dairy.
      </p>

      {/* search box */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* category dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Starters">Starters</option>
        <option value="Mains">Mains</option>
        <option value="Desserts">Desserts</option>
        <option value="Beverages">Beverages</option>
      </select>

      {/* dietary dropdown */}
      <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
        <option value="All">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-free</option>
      </select>

      {/* max price box */}
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* show a message if nothing matches */}
      {filteredItems.length === 0 && <p>No items match your search.</p>}

      {/* grid wrapper puts the cards in two columns */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
