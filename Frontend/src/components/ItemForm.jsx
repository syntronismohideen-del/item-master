import { useState } from "react";
import Button from "./Button";

const ItemForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ItemForm;
