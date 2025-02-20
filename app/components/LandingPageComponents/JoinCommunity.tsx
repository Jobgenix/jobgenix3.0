import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export function JoinCommunity() {
  return (
    <div className="mt-2">
      <Link href="https://chat.whatsapp.com/LAMPVH8O7MS8aiagu16FTH" target="_blank" passHref>
        <Button className="bg-[#2F8E5B] text-white hover:bg-[#1E7045]">Join our Community</Button>
      </Link>
    </div>
  );
}
