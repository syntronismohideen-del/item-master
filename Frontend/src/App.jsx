import { useEffect, useState } from "react";
import API from "./api";
import ItemTable from "./components/ItemTable";
import ItemForm from "./components/ItemForm";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = async () => {
    const res = await API.get("/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (data) => {
    if (editItem) {
      await API.put(`/api/items/${editItem.id}`, data);
    } else {
      await API.post("/api/items", data);
    }
    setIsOpen(false);
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          Item Master 🚀
        </h1>
        <Button onClick={() => setIsOpen(true)}>+ Add Item</Button>
      </div>

      <ItemTable
        items={items}
        onEdit={(item) => {
          setEditItem(item);
          setIsOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ItemForm onSubmit={handleSave} initialData={editItem} />
      </Modal>
    </div>
  );
}

export default App;
