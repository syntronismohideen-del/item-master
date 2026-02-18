import { useState } from "react";
import Button from "./Button";

function ItemForm({ onSubmit, onCancel, initialData, loading = false }) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [touched, setTouched] = useState(false);

  const parsedPrice = Number(price);
  const isValid = name.trim().length > 1 && Number.isFinite(parsedPrice) && parsedPrice > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;

    await onSubmit({
      name: name.trim(),
      price: parsedPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700" htmlFor="item-name">
          Item Name
        </label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter item name"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-300 transition focus:ring-2"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700" htmlFor="item-price">
          Price (INR)
        </label>
        <input
          id="item-price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Enter price"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-300 transition focus:ring-2"
        />
      </div>

      {touched && !isValid ? (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Enter a valid name and a price greater than 0.
        </p>
      ) : null}

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="neutral" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Item"}
        </Button>
      </div>
    </form>
  );
}

export default ItemForm;
