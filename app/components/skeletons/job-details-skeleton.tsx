import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"

export default function JobDetailsSkeleton() {
  return (
    <Card className="w-[70%] mx-auto h-screen bg-[#E5F7EB] overflow-auto custom-scrollbar">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton circle width={52} height={52} />
          <div className="flex gap-2">
            <Skeleton width={32} height={32} />
            <Skeleton width={32} height={32} />
          </div>
        </div>
        <Skeleton width="60%" height={36} />
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Skeleton width={100} />
            <Skeleton width={100} />
            <Skeleton width={150} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton width={24} height={24} />
            <Skeleton width={100} />
            <Skeleton width={50} />
          </div>
        </div>
        <div className="flex gap-5 mt-8">
          <Skeleton width={100} height={40} />
          <Skeleton width={150} height={40} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-4">
          <Skeleton width={150} height={24} />
          <Skeleton count={5} />
        </section>
      </CardContent>
    </Card>
  )
}

