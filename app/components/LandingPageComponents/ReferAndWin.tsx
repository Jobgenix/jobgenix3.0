import Image from "next/image";
// import img from "../../Images/Main.png";

export  function ReferAndWin() {
  return (
    <div className="bg-[#E8F5E9] p-10 flex items-center justify-center">
      <div className="w-4/5 xl:w-2/5 border p-6 flex flex-col xl:flex-row items-center rounded-xl justify-between bg-[#9BE6C1]"> {/* Added flex-col and xl:flex-row */}
        <div className="space-y-2 text-center xl:text-left"> {/* Added text-center and xl:text-left */}
          <h2 className="text-2xl font-semibold text-gray-800">Refer & Win</h2>
          <p className="text-gray-600 text-sm">
            MacBook, iPhone, Apple Watch,
            <br />
            AirPods, Cash Rewards and more!
          </p>
          <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
        <div className="relative mt-6 xl:mt-0"> {/* Added margin-top for mobile */}
          <div className="rounded-2xl overflow-hidden border-[#B7E4C7]"> {/* Removed hidden and xl:flex */}
            <Image
              src="/LandingPageImages/Main.png" // Added image path
              alt="People using referral app"
              width={230} // Important: Add width
              height={170} // Important: Add height
              style={{ objectFit: 'cover' }} // Use style prop
            />
          </div>
        </div>
      </div>
    </div>
  );
}