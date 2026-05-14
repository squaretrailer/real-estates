function StatCard({ title, value, growth }) {
  return (
    <div className="bg-black text-amber-50 p-6">
      <h3 className="text-amber-50 text-sm mb-3">
        {title}
      </h3>

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          {value}
        </h2>

        {/* {growth && (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            {growth}
          </span>
        )} */}
      </div>
    </div>
  );
}

export default StatCard;