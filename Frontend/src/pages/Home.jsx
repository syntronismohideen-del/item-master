import { useEffect, useState } from "react";
import API from "../api/axios";
import ItemCard from "../components/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchItems = async () => {
    const res = await API.get("/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    await API.post("/api/items", { name, price });
    setName("");
    setPrice("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="container">
      <h1>Item Master 🚀</h1>

      <form onSubmit={addItem} className="form">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
