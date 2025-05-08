"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Sora } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
  

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LoginModalProps = {
  onClose: () => void; // Function to close the modal
};

export default function LoginModal({ onClose }: LoginModalProps) {

  const router = useRouter();
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback");

  const handleClose = () => {
    router.push("/"); // Navigate to home page
    onClose();
  };

  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<LoginFormData>(); // Explicitly type the form data

  type LoginFormData = {
    email: string;
    password: string;
  };

  async function  onSubmit (data: LoginFormData) {
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      console.log("Login successful");
      router.push('/profile');
    }
  };

  

  

  


  return (
    <div
      className={`fixed  inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50 ${sora.className}"`}
    >
      <div className="border items-center border-[#333] rounded-[30px] text-white w-[400px] p-8 shadow-lg backdrop-blur-sm">
        <button
          className="absolute top-4 right-4 text-white text-xl"
          onClick={handleClose}
        >
          <X />
        </button>
        <div className="w-full flex justify-center pb-2">
          <div className="relative h-5 w-32 overflow-hidden">
            <Image src={"/brand/JobGenix-dark.png"} fill alt="logo"></Image>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mb-3">
          Hey Rockstar, Ready to Level Up?
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="enter your email address"
              className="w-full px-4 py-1 rounded-md border border-[#0073E6] bg-transparent text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0073E6]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="********"
                className="w-full px-4 py-1 rounded-md border border-[#0073E6] bg-transparent text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0073E6]"
              />
              <button
                type="button"
                className="absolute right-3 top-[5px] text-gray-400"
              >
                <Eye />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs rounded-md bg-[#0073E6] hover:bg-blue-700 transition font-light"
          >
            Sign Up
          </button>
        </form>
        <a
          href="#"
          className="hover:underline w-full flex justify-end text-xs text-gray-300 mt-2"
        >
          Forgot Password ?
        </a>

        <div className="text-center mt-4 text-xs font-light text-gray-300">
          Already have an account ?{" "}
          <a href="#" className="text-white hover:underline">
            Log in
          </a>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <button onClick={() => callbackUrl?.length ? signIn('google', { redirectTo: callbackUrl }) : signIn('google')} className="w-full py-2 border border-white rounded-md flex items-center justify-center gap-2 bg-white text-black transition">
          <FcGoogle size={20} />
          Log in with Google
        </button>

        <p className="text-[12px] font-light text-center text-gray-400 mt-4">
          By clicking Sign Up, you agree to JobGenix <br />
          <span className="text-white"> User Agreement</span>, and
          <span className="text-white"> Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
