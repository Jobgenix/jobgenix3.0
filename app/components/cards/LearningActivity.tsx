export default function LearningActivity() {
  // const activityData = Array.from({ length: 365 }, () =>
  //   Math.random() > 0.7 ? 1 : 0
  // );
  const months = [
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
  ];
  return (
    <div className="card-shadow h-56 flex flex-col items-start justify-between lg:items-center gap-4 sm:pl-5 px-[10px] py-[20px] rounded-[15px] bg-white">
      <div className="flex items-center w-full">
        {/* Heading */}
        <h1
          className="relative left-[2%] md:left-[7%] text-2xl leading-[2.8rem] font-sora font-normal 
                 w-full sm:w-auto text-left sm:text-center sm:mx-auto"
        >
          Learning Activity
        </h1>

        {/* Selectors */}
        <div className="flex gap-1 sm:ml-0 sm:gap-1 sm:flex-row sm:items-center text-[#646F73] font-medium">
          <select className="text-xs font-montserrat border rounded sm:px-2 py-1 bg-transparent border-none">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>

          <select className="text-xs font-montserrat border rounded py-1 bg-transparent border-none">
            <option>All</option>
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>May</option>
            <option>Jun</option>
            <option>Jul</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </select>
        </div>
      </div>

      <div className="scrollbar-hide overflow-x-auto bg-white rounded-lg w-full">
        {/* Months */}
        <div className="flex text-[10px] font-sora text-gray-500 mb-1 ml-6 gap-x-7">
          <div className="w-3 h-3 mr-1"></div> {/* Spacer */}
          {months.map((month, i) => (
            <div key={i} className="w-12 text-center">
              {month}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Days */}
          <div className="flex flex-col justify-center gap-4 text-[10px]  font-sora text-gray-500 mr-1">
            {["Mon", "Wed", "Fri"].map((day, i) => (
              <div key={i} className="h-3">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div
            className="grid gap-x-3 gap-y-1"
            style={{
              gridTemplateColumns: `repeat(70, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(7, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: 70 * 7 }).map((_, i) => (
              <div
                key={i}
                className="size-[10px] bg-[#F5F5F5] border border-[#333333] rounded-[0.19rem]"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
