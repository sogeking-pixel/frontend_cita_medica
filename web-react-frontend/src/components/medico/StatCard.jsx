
function StatCard({ icon, title, value, color, loading = false}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-semibold uppercase">
          {title}
        </h3>
        {icon}
      </div>
      {loading ? (
        <div className="mt-2">
          <div className="h-8 bg-gray-200 rounded-xl w-1/2 animate-pulse"></div>
        </div>
      ) : (
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      )}
    </div>
  );
};

export default StatCard;
