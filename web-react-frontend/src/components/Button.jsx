function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-4 sm:py-2 [background:radial-gradient(125%_125%_at_50%_10%,#8FA29F_40%,#3c7677ff_100%)] text-white rounded-3xl font-bold hover:[background:radial-gradient(125%_125%_at_50%_10%,#7F928F_40%,#2a6466ed_100%)] transition-all duration-1000 ease-in-out
  ${className}`}
    >
      {children}
    </button>
  );
}
export default Button; 