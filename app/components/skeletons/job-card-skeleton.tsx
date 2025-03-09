// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export default function JobCardSkeleton() {
//   return (
//     <div className="bg-transparent rounded-lg shadow-md p-4 mb-4 w-full">
//       <div className="flex items-center mb-2">
//         <Skeleton circle width={40} height={40} />
//         <div className="ml-3">
//           <Skeleton width={150} />
//           <Skeleton width={100} />
//         </div>
//       </div>
//       <Skeleton count={2} />
//       <div className="flex justify-between mt-2">
//         <Skeleton width={60} />
//       </div>
//     </div>
//   );
// }


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function JobCardSkeleton() {
  return (
    <div className="w-[98%] lg:w-full mt-3 overflow-hidden bg-transparent border-none shadow-sm p-4">
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width={100} height={15} />
          </div>
          <Skeleton width={80} height={20} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Skeleton circle width={32} height={32} />
            <Skeleton width={50} height={15} className="rounded-3xl" />
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop */}
            <Skeleton width={80} height={30} className="rounded-3xl"/>

          </div>
        </div>
      </div>
    </div>
  );
}