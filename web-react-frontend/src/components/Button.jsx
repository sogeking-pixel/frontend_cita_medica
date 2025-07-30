function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-4 sm:py-2 [background:radial-gradient(125%_125%_at_50%_10%,#8FA29F_40%,#3A6A6B_100%)] text-white rounded-3xl font-bold hover:bg-green-600 transition ${className}`}
    >
      {children}
    </button>
  );
}
export default Button;