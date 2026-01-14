const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default Loader;
