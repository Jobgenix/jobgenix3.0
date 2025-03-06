import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from "@/app/components/ui/input";

export default function Cards() {
    const data = {
        "roadmaps": [
            { "title": "", "description": "", "image": "" },
            { "title": "", "description": "", "image": "" },
            { "title": "", "description": "", "image": "" }
        ]
    };

    return (
        <div>
            <div className="header flex mt-5 text-2xl ml-5 font-semibold">
                <h1>Trending</h1>
                <div className="h-1 w-16 bg-black absolute mt-8 ml-4"></div>
                <Image src="/images2/fire.png" className="ml-3" alt="fire" width={20} height={20} />
                <Input
                    type="search"
                    placeholder="Search Roadmaps..."
                    className="w-[20%] h-8 text-[#646A66] rounded-3xl bg-[#ecf3dd] border-none ml-[45%] lg:ml-[70%] md:ml-[60%] sm:ml-[56%]"
                />
                <Search className="h-8 w-4 absolute lg:right-8 text-gray-400 right-5  md:right-16 sm:right-7" />
            </div>

            <div className="cards-container flex flex-wrap justify-center gap-40 mt-10">
                {data.roadmaps.map((_, index) => (
                    <div key={index} className="relative bg-white rounded-lg shadow-lg w-64 h-72 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <button className="w-56 h-8 border border-[#007347] text-[#007347] absolute bottom-4 left-4 rounded-lg bg-white shadow-md hover:bg-[#007347] hover:text-white transition">
                            Explore
                        </button>
                    </div>
                ))}
            </div>

            <div className="header flex mt-5 text-2xl ml-5 font-semibold">
                <h1>Most Loved</h1>
                <div className="h-1 w-20 bg-black absolute mt-8 ml-4"></div>
                <Image src="/images2/pink-love.png" className="ml-3" alt="love" width={30} height={20} />
            </div>

            <div className="cards-container flex flex-wrap justify-center gap-40 mt-10 mb-20">
                {data.roadmaps.map((_, index) => (
                    <div key={index} className="relative bg-white rounded-lg shadow-lg w-64 h-72 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl ">
                        <button className="w-56 h-8 border border-[#007347] text-[#007347] absolute bottom-4 left-4 rounded-lg bg-white shadow-md hover:bg-[#007347] hover:text-white transition">
                            Explore
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
