import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-400",
  neutral:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100",
  danger:
    "bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-400",
};

function Button({
  children,
  onClick,
  type = "button",
  variant = "neutral",
  className = "",
  disabled = false,
}) {
  const MotionButton = motion.button;
  const styleClass = variants[variant] || variants.neutral;

  return (
    <MotionButton
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styleClass} ${className}`}
    >
      {children}
    </MotionButton>
  );
}

export default Button;
