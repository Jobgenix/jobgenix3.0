"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ROLE_IDS } from "@/constants/roles";
import { useSession } from "next-auth/react";
import axios from "axios";

const FirstTimeSignIn = () => {
  const router = useRouter();
  const session = useSession();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
    if (
      session.data?.user.role !== ROLE_IDS.NEW_USER &&
      session.status === "authenticated"
    ) {
      router.push("/");
    }
  }, [session, router]);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    try {
      if (!selectedRole) {
        console.error("Role is not selected");
        return;
      }

      if (session.status === "unauthenticated") {
        console.error("User is not authenticated");
        return;
      }

      const userId = session.data?.user?.id;
      if (!userId) {
        console.error("User ID is missing in session data");
        return;
      }

      const response = await axios.post("/api/auth/new-user", {
        userId,
        newRoleId: selectedRole,
      });

      if (response.status === 200) {
        await session.update({ role: selectedRole });
        router.push("/");
      } else {
        console.error("Failed to update user role:", response.data);
      }
    } catch (error) {
      console.error("Error in handleContinue:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center ">
      <h1 className="md:text-2xl text-xl font-bold text-slate-700 mb-6 text-center">
        Choose Your Role to Get Started
      </h1>

      <div className="flex gap-6 flex-col  items-center md:flex-row">
        <div
          className={`md:w-64 w-full p-2  border rounded-2xl cursor-pointer transition transform hover:scale-105 hover:shadow-lg ${
            selectedRole === ROLE_IDS.EMPLOYER
              ? "border-[#2F8E5B]"
              : "border-gray-300"
          }`}
          //onClick={() => handleSelect(ROLE_IDS.EMPLOYER)}
        >
          <Image
            src="/images/EmployerIcon.svg"
            alt="Employer"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-center">Employer</h2>
          <p className="text-md text-gray-600 text-center">
            Post jobs and find top talent for your company.
          </p>
        </div>

        <div
          className={`md:w-64 w-full p-2 border  rounded-2xl cursor-pointer transition transform hover:scale-105 hover:shadow-lg ${
            selectedRole === ROLE_IDS.CANDIDATE
              ? "border-[#2F8E5B]"
              : "border-gray-300"
          }`}
          onClick={() => handleSelect(ROLE_IDS.CANDIDATE)}
        >
          <Image
            src="/images/StudentIcon.svg"
            alt="Candidate"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-center">Candidate</h2>
          <p className="text-md text-gray-600 text-center">
            Find your dream job and connect with employers.
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className={`mt-6 text-xl w-64 py-2 font-bold rounded-xl transition ${selectedRole
          ? "bg-[#2F8E5B] text-white hover:bg-[#329761]"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!(selectedRole && session.status === "authenticated")}
      >
        Continue
      </button>
    </div>
  );
};

export default FirstTimeSignIn;
