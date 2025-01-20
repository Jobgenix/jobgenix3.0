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
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
                <Image
                    src="/images/loginImage.png"
                    alt="Sign Out Illustration"
                    className="w-full max-w-sm md:max-w-md border rounded-2xl"
                    width={400}
                    height={400}
                    priority
                />
            </div>

            <div className="p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg md:w-1/2 lg:w-2/5">
                <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">
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
    );
};

export default SignOut;
