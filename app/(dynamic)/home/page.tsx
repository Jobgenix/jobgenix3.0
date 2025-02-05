"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

const SignOut = () => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/auth/login");
        }

        if (session.status === "loading") {
            return
        }
    }, [session, router]);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/auth/login"); // Redirect to the homepage or login page after signout
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    return (
        <div className="flex min-h-screen w-screen justify-center bg-[#E5F7EB] items-center">
           <div className="md:h-[90vh] h-[85vh] max-md:w-4/5 lg:w-[50vw] p-2 rounded-lg md:rounded-bl-[50px] bg-white flex flex-col-reverse md:flex-row items-center justify-between">
             <div className="hidden md:flex h-full w-2/5 justify-center">
                      <Image
                        src="/LandingPageImages/login page.png"
                        alt="Login Illustration"
                        className="w-full rounded-2xl rounded-tr-[50px] rounded-bl-[50px]"
                        width={400}
                        height={200 / (9 / 16)}
                      />
                    </div>

                    <div className="h-full w-full flex justify-center px-6 flex-col max-w-sm sm:max-w-md md:w-3/5">
                <h1 className="text-xl text-center text-slate-700 mb-6">
                    Ready to leave? <span className="text-[#2F8E5B]">Sign Out!</span>
                </h1>

                

                <button
                    onClick={handleSignOut}
                    className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
                >
                    Sign Out
                </button>
            </div>
        </div>
        </div>
        
    );
};

export default SignOut;
