"use client";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link"; // ✅ Import Link

const ComingSoon = () => {
    return (
        <>
            <div
                className="h-[100vh] w-full bg-top  md:bg-cover bg-no-repeat flex flex-col    items-center overflow-hidden
                 md:bg-[url('/images/ComingSoon.png')] bg-[url('/images/comingSoonMobile.png')]"
            >
                <Navbar />
                <div className="h-[90vh] w-3/5 md:w-4/5 flex flex-col gap-3 justify-end  py-10 md:py-0 md:justify-center py-4 md:py-0  md:- items-start md:pl-5 ">
                    {/* Heading */}
                    <p className="text-4xl md:text-5xl font-bold flex items-center gap-2 text-green-600">
                        <img
                            src="/images/emoji.png"
                            alt="Icon"
                            width={35}
                            className="hidden  md:block"
                        />
                        Hey!
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-gray-600">
                        We are cooking <br /> this feature...
                    </p>

                    {/* Message Box */}
                    <div className="p-2 hidden md:flex text-md md:text-lg flex justify-center items-center text-white bg-[#2F8E5B] rounded-xl">
                        Meanwhile, feel free to interact with <br /> our socials.
                    </div>

                    <div className="p-2 md:hidden text-md md:text-lg flex justify-center items-center text-white bg-[#2F8E5B] rounded-xl">
                        Meanwhile, feel free to interact with our socials.
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-2 w-full items-center   justify-center md:justify-start">
                        <Link href=" https://www.linkedin.com/company/successwithjobgenix/" target="_blank">
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="text-blue-600 text-3xl  greenish"
                            />
                        </Link>
                        <Link href=" https://www.instagram.com/jobgenix.unbeatable/" target="_blank">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-pink-500 text-3xl  greenish"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComingSoon;
