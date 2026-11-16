// Menu page - shows all menu items
import menuItems from "../data/menuData";
import MenuItem from "../components/MenuItem";

function Menu() {
  return (
    <div>
      <h1>Our Menu</h1>

      {/* loop through the array, one card per item */}
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Menu;
