import { motion } from "framer-motion";

const Button = ({ children, onClick, type = "button", color = "indigo" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className={`px-4 py-2 bg-${color}-600 text-white rounded-xl shadow-md hover:bg-${color}-700 transition`}
    >
      {children}
    </motion.button>
  );
};

export default Button;

