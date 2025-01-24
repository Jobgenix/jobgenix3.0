import Link from "next/link";
import {
  Laptop,
  FileText,
  FileCheck,
  AmbulanceIcon as FirstAid,
} from "lucide-react";

export default function OtherBenifits() {
  const benefits = [
    { icon: <Laptop className="w-8 h-8" />, title: "Job Offer" },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Certificate of Completion",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Letter of Recommendation",
    },
    { icon: <FirstAid className="w-8 h-8" />, title: "Medical Insurance" },
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-medium text-emerald-700 mb-6">
          Other Benefits:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg space-y-4 hover:border-emerald-500 transition-colors bg-white"
            >
              {benefit.icon}
              <span className="text-center text-sm font-medium">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="#"
        className="inline-block text-blue-600 hover:text-blue-700 hover:underline text-sm"
      >
        + View more
      </Link>
    </>
  );
}
