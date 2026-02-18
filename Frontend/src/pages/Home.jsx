import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import ItemForm from "../components/ItemForm";
import ItemTable from "../components/ItemTable";
import Modal from "../components/Modal";
import { useItems } from "../hooks/useItems";

function Home() {
  const MotionSection = motion.section;
  const MotionAlert = motion.p;
  const { items, loading, saving, error, saveItem, deleteItem } = useItems();
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const stats = useMemo(() => {
    const totalItems = items.length;
    const totalValue = items.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );
    const avgValue = totalItems ? totalValue / totalItems : 0;

    return {
      totalItems,
      totalValue,
      avgValue,
    };
  }, [items]);

  const handleCreateClick = () => {
    setEditItem(null);
    setIsOpen(true);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleSave = async (payload) => {
    const done = await saveItem(payload, editItem?.id || null);
    if (!done) return;

    setIsOpen(false);
    setEditItem(null);
  };

  const title = editItem ? "Edit Item" : "Add New Item";

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <MotionSection
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="panel mb-6 overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 inline-flex rounded-full border border-cyan-200/60 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-700">
                INVENTORY DASHBOARD
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Item Master
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                A clean modular CRUD app with faster workflows, smoother
                animations, and better visual feedback.
              </p>
            </div>
            <Button onClick={handleCreateClick} variant="primary">
              + Add Item
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Items</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stats.totalItems}
              </p>
            </article>
            <article className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">
                Total Value
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                INR {stats.totalValue.toFixed(2)}
              </p>
            </article>
            <article className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">
                Average Price
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                INR {stats.avgValue.toFixed(2)}
              </p>
            </article>
          </div>
        </MotionSection>

        {error ? (
          <MotionAlert
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          >
            {error}
          </MotionAlert>
        ) : null}

        <ItemTable
          items={items}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={deleteItem}
        />

        <Modal
          isOpen={isOpen}
          title={title}
          onClose={() => {
            setIsOpen(false);
            setEditItem(null);
          }}
        >
          <ItemForm
            key={editItem ? `edit-${editItem.id}` : "create-item"}
            initialData={editItem}
            loading={saving}
            onCancel={() => {
              setIsOpen(false);
              setEditItem(null);
            }}
            onSubmit={handleSave}
          />
        </Modal>
      </div>
    </main>
  );
}

export default Home;
