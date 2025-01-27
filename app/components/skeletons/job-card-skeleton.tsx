import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function JobCardSkeleton() {
  return (
    <div className="bg-transparent rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <Skeleton circle width={40} height={40} />
        <div className="ml-3">
          <Skeleton width={150} />
          <Skeleton width={100} />
        </div>
      </div>
      <Skeleton count={2} />
      <div className="flex justify-between mt-2">
        <Skeleton width={60} />
      </div>
    </div>
  );
}
