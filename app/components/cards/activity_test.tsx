{/* Learning Activity */}
<div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
<div className="flex justify-between items-center">
  <h2 className="text-lg font-semibold">Learning Activity</h2>
  <div className="text-sm text-gray-600">2025 ▾ January</div>
</div>

{/* Month Labels */}
<div className="grid grid-cols-52 pl-8 mb-1">
  {[
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
  ].map((month, i) => (
    <div key={i} className="col-span-4 text-xs text-gray-500">
      {month}
    </div>
  ))}
</div>

<div className="flex">
  {/* Days of Week */}
  <div className="flex flex-col justify-between mr-1 h-[60px]">
    {["Mon", "Wed", "Fri"].map((day, i) => (
      <div key={i} className="text-xs text-gray-500 h-[8px]">
        {day}
      </div>
    ))}
  </div>

  {/* Activity Grid */}
  <div className="grid grid-cols-52 gap-[2px]">
    {Array.from({ length: 52 }).map((_, colIndex) => (
      <div key={colIndex} className="flex flex-col gap-[2px]">
        {Array.from({ length: 7 }).map((_, rowIndex) => {
          const index = colIndex * 7 + rowIndex;
          const isFilled = [34, 67, 110, 222, 300].includes(index); // example data
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-sm ${
                isFilled ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    ))}
  </div>
</div>
</div>