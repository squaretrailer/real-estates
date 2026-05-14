function PropertyPerformance({ properties }) {
  const totalProperties = properties.length;

  const soldProperties = properties.filter(
    (property) =>
      property.status?.toLowerCase() === "sold"
  ).length;

  const performance =
    totalProperties === 0
      ? 0
      : Math.round(
          (soldProperties / totalProperties) * 100
        );

  return (
    <div className="bg-gradient-to-br from-cyan-900 to-cyan-400 text-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Property Performance
      </h2>

      <div className="flex justify-center items-center h-52">
        <div className="w-40 h-40 rounded-full border-[14px] border-white flex items-center justify-center text-3xl font-bold">
          {performance}%
        </div>
      </div>

      <p className="mt-6 text-sm opacity-90">
        {soldProperties} of {totalProperties} properties sold.
      </p>
    </div>
  );
}

export default PropertyPerformance;