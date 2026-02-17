import { motion } from "framer-motion";
import Button from "./Button";

const ItemTable = ({ items, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b"
            >
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td className="space-x-2">
                <Button onClick={() => onEdit(item)}>Edit</Button>
                <Button color="red" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
