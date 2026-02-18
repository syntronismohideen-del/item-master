import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

function LoadingRows() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded-xl bg-slate-100"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-lg font-semibold text-slate-800">No items yet</p>
      <p className="mt-1 text-sm text-slate-500">
        Create your first item to start managing inventory.
      </p>
    </div>
  );
}

function ItemTable({ items, loading, onEdit, onDelete }) {
  const MotionRow = motion.tr;

  return (
    <section className="panel overflow-hidden rounded-3xl">
      <header className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-900">Item List</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length} entries
        </span>
      </header>

      {loading ? (
        <LoadingRows />
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto p-3">
          <table className="w-full min-w-[560px] table-auto border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <MotionRow
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70"
                  >
                    <td className="rounded-l-2xl px-4 py-3 font-semibold text-slate-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      INR {Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="rounded-r-2xl px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="neutral" onClick={() => onEdit(item)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </MotionRow>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ItemTable;
