"use client";
import { Eye, EyeOff, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

type LoginModalProps = {
  onClose: () => void; // Function to close the modal
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback");
  const [showPassword, setShowPassword] = React.useState(false); // For show/hide
  const [error, setError] = React.useState<string | null>(null); // For error message

  const [loading, setLoading] = React.useState(false); // Add loading state

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

  async function onSubmit(data: LoginFormData) {
    setLoading(true); // Set loading to true when login starts
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false); // Set loading to false when login finishes
    if (result?.error) {
      console.log(result.error);
      setError("Invalid email or password.");
    } else {
      console.log("Login successful");
      router.push("/profile");
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 font-sora`}
    >
      <div className="border items-center border-[#333] rounded-[30px] text-white w-[400px] p-12 shadow-lg backdrop-blur-sm bg-[rgba(30,30,30,0.7)]">
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

        <p className="text-center text-md text-gray-400 mb-3">Welcome Back</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="enter your email address"
              className="w-full px-4 py-2 rounded-md border border-[#0073E6] bg-transparent text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0073E6]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative flex items-center">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-2 rounded-md border border-[#0073E6] bg-transparent text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0073E6]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-[rgba(30,30,30,0.7)]">
            <label className="flex items-center">
              <input type="checkbox" checked className="mr-2" />
              <span className="text-gray-300">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-xs md:text-sm rounded-md bg-[#0073E6] hover:bg-blue-700 font-bold transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-xs text-center mt-2">{error}</div>
        )}
        <a
          href="#"
          className="hover:underline w-full flex justify-end text-xs text-gray-300 mt-2"
        >
          Forgot Password ?
        </a>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <button
          onClick={() =>
            callbackUrl?.length
              ? signIn("google", { redirectTo: callbackUrl })
              : signIn("google")
          }
          className="w-full py-2 border border-white rounded-md flex items-center justify-center gap-2 bg-white text-black transition"
        >
          <FcGoogle size={20} />
          Log in with Google
        </button>
      </div>
    </div>
  );
}
