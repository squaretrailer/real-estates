function PropertyPerformance() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-violet-400 text-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Units Performance
      </h2>

      <div className="flex justify-center items-center h-52">
        <div className="w-40 h-40 rounded-full border-[14px] border-black text-white flex items-center justify-center text-3xl font-bold">
          74%
        </div>
      </div>

      <p className="mt-6 text-sm opacity-90">
        Property performance has improved this month.
      </p>
    </div>
  );
}

export default PropertyPerformance;