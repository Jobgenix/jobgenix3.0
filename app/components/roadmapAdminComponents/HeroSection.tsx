import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative w-full bg-[#F3F9F3]">
      <div className="relative w-full h-auto">
        <Image
          src="/roadmapAdminImages/HeroImage.png"
          alt="Hero Image"
          width={1920} // Set a large width to maintain resolution
          height={0} // Height will adjust based on aspect ratio
          quality={100} // Ensures high-quality rendering
          priority // Loads the image immediately
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
