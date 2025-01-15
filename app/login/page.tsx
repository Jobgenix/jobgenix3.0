'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FormData {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(
    false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, otp, newPassword, confirmNewPassword } = formData;

    if (!email || !otp || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      alert("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    // Mock API call simulation
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successful!");
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
        <Image
          src="/images/loginImage.png"
          alt="Forgot Password Illustration"
          className="w-full max-w-sm md:max-w-md border rounded-2xl"
          width={400}
          height={400}
        />
      </div>

      {/* Right Section */}
      <div className="p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg md:w-1/2 lg:w-2/5">
        <h5>👋 Reset Password</h5>
        <h1 className="text-2xl font-bold text-slate-700 mb-6">
          Reset Your <span className="text-[#2F8E5B]">JobGenix</span> Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl">
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border-none rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleInputChange}
                className="w-full p-2 border-none rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* New Password Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 border-none rounded-xl focus:outline-none pr-10"
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className="absolute right-3 text-[#2F8E5B] cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>

          {/* Confirm New Password Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                className="w-full p-2 border-none rounded-xl focus:outline-none pr-10"
              />
              <FontAwesomeIcon
                icon={showConfirmNewPassword ? faEyeSlash : faEye}
                className="absolute right-3 text-[#2F8E5B] cursor-pointer"
                onClick={toggleConfirmNewPasswordVisibility}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            className="text-[#2F8E5B] hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
