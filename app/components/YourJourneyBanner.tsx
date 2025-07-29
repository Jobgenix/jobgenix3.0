export default function YourJourneyBanner() {
  return (
    <div className="h-72 w-full max-w-[71.2rem] bg-gradient-to-br from-[#0073E6] to-[#02386E] rounded-[2rem] shadow-[21px_21px_53px_0px_#D1D1D1E5,-21px_-21px_42px_0px_#FFFFFFE5,21px_-21px_42px_0px_#D1D1D133,-21px_21px_42px_0px_#D1D1D133,-1px_-1px_2px_0px_#D1D1D180_inset,1px_1px_2px_0px_#FFFFFF4D_inset] overflow-hidden">
      <div className=" lg:bg-[url('/background/yourJourneyBanner.svg')] bg-cover bg-center bg-no-repeat w-full max-w-[71.2rem] h-full flex flex-col items-center gap-4 justify-center">
        <h1 className="font-sora font-semibold text-[2.5rem] lg:text-[3rem] text-white leading-[3rem] md:leading-[2.5rem] text-center">
          Your Journey’s Just Getting Started
        </h1>
        <button className="rounded-3xl border border-white w-[11.8rem] text-base leading-[1.4rem] font-montserrat font-medium h-10 text-white">
          Explore More Jobs
        </button>
      </div>
    </div>
  );
}
