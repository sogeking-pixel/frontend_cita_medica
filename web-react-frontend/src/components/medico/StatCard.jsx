
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-semibold uppercase">
          {title}
        </h3>
        {icon}
      </div>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
