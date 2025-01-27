"use client";
/*eslint-disable*/
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import {
  MoreHorizontal,
  Share2,
  ShieldCheck,
  Users,
  Briefcase,
  Home,
  ArrowLeftRight,
} from "lucide-react";
import type { JobDetailsProps } from "@/types/job";
import Image from "next/image";
import Link from "next/link";
import { capitalizeWords } from "@/utils/stringUtility";

export default function JobDetails({
  companies,
  opportunities,
  children,
}: JobDetailsProps) {
  const {
    name,
    logo,
  } = companies;

  const {
    title,
    location,
    workplaceType,
    type,
    postedAt,
    status,
    jobLink,
    description,
  } = opportunities;
  const isVerified = status === "active";

  const formatTimeAgo = (datestring: string) => {
    // In a real app, implement proper time ago formatting
    return "2 Hours ago";
  };

  return (
    <Card className="w-[70%] mx-auto h-screen bg-[#E5F7EB] overflow-auto custom-scrollbar">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${name} logo`}
            width={52}
            height={52}
            className="object-contain"
          />

          <div className="flex gap-2">
            <Button variant="ghost">
              <Share2 className="h-8 w-8" />
            </Button>
            <Button variant="ghost">
              <MoreHorizontal className="h-32 w-32" />
            </Button>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-wide text-black/60 flex items-center gap-2">
          {title}
          {isVerified && <ShieldCheck className="h-9 w-9 text-blue-500" />}
        </h1>
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-base font-bold text-muted-foreground">
            <span>{capitalizeWords(location)}</span>
            <span className="text-emerald-600">
              • {formatTimeAgo(postedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {/* update this with actual count */}
              {35} people clicked apply
            </span>
          </div>

          <div className="flex flex-wrap gap-2 font-bold text-black/60">
            {workplaceType === "office" && <Briefcase className="h-6 w-6" />}
            {workplaceType === "remote" && <Home className="h-6 w-6" />}
            {workplaceType === "hybrid" && (
              <ArrowLeftRight className="h-6 w-6" />
            )}
            <Badge
              variant="secondary"
              className="bg-[#AAFEC4] text-black/50 hover:bg-emerald-100 rounded-none px-3 text-base tracking-wide capitalize"
            >
              {capitalizeWords(workplaceType)}
            </Badge>
            • {type}
          </div>
        </div>

        <div className="flex gap-5 mt-8">
          <Link href={jobLink} passHref legacyBehavior>
            <a target="_blank">
              <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full  text-lg font-medium px-6 shadow-md shadow-black/30">
                Apply
              </Button>
            </a>
          </Link>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border border-[#01A768] text-[#01A768] hover:bg-emerald-700 rounded-full  text-lg font-medium px-6 shadow-md shadow-black/30"
          >
            <Users className="h-4 w-4" />
            Referral Person
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-medium">About the job</h2>

          <div className="space-y-4" dangerouslySetInnerHTML={{ __html: description }}/>
        </section>
      </CardContent>
    </Card>
  );
}
