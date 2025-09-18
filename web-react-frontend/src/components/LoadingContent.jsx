export default function LoadingContent(
    { title = "Cargando.." }
) {
    return (
      <div className="flex items-center space-x-2 justify-center">
        <span className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></span>
        <span>{title}</span>
      </div>
    );
}