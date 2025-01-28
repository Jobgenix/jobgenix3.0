"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FormData {
    email: string;
    otp: string;
    newPassword: string;
    confirmNewPassword: string;
    rememberMe: boolean;
}

const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        otp: "",
        newPassword: "",
        confirmNewPassword: "",
        rememberMe: false,
    });

    const [error, setError] = useState<string>("");
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otpSending, setOtpSending] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);

    const router = useRouter();

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const { email, otp, newPassword, confirmNewPassword } = formData;

        if (!email || !otp || !newPassword || !confirmNewPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setIsLoading(true);

        // Simulate API call or add your logic here
        setTimeout(() => {
            setIsLoading(false);
            alert("Password reset successful!");
            router.push("/");
        }, 2000);
    };

    const handleSendOtp = (): void => {
        setOtpSending(true);
        // Simulate OTP sending logic here (replace with actual OTP sending logic)
        setTimeout(() => {
            setOtpSending(false);
            setOtpSent(true);
            alert("OTP sent to your email!");
        }, 2000);
    };

    return (

        <div className="flex h-[100vh] w-screen justify-center bg-[#E5F7EB] items-center">
            <div className="md:h-[98vh] h-[80vh] md:w-[85vw]  lg:w-[48vw]   p-2 rounded-lg rounded-bl-[50px] bg-white flex flex-col md:flex-row items-center justify-between ">
                {/* Left Section: Image */}
                <div className="hidden h-full  md:flex md:w-2/5  lg:w-[20vw] justify-center">
                    <Image
                        src="/LandingPageImages/login page.png"
                        alt="Signup Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-sm md:max-w-md border rounded-2xl"
                        priority
                    />
                </div>

                {/* Right Section: Forgot Password Form */}
                <div className="h-full  flex justify-center px-1 flex-col   max-w-sm sm:max-w-md  md:w-1/2 lg:w-1/2">
                    <div className="p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                        <h1 className="text-xl  text-slate-700 mb-6">
                            Forgot Your <span className="text-[#2F8E5B]">Password?</span>
                        </h1>

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                                />
                            </div>

                            {/* OTP */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="OTP"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                                />
                            </div>

                            {/* New Password */}
                            <div className="mb-4 relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none pr-10"
                                />
                                <FontAwesomeIcon
                                    icon={showNewPassword ? faEyeSlash : faEye}
                                    className="absolute top-3 right-3 text-[#2F8E5B] cursor-pointer"
                                    onClick={toggleNewPasswordVisibility}
                                    width={18}
                                    height={18}
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div className="mb-4 relative">
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    value={formData.confirmNewPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none pr-10"
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmNewPassword ? faEyeSlash : faEye}
                                    className="absolute top-3 right-3 text-[#2F8E5B] cursor-pointer"
                                    onClick={toggleConfirmNewPasswordVisibility}
                                    width={18}
                                    height={18}
                                />
                            </div>

                            {/* Send OTP Text */}
                            <div className="mb-4">
                                <span
                                    onClick={handleSendOtp}
                                    className="text-[#2F8E5B] text-sm underline cursor-pointer"
                                >
                                    {otpSending ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                                </span>
                            </div>

                            {/* Remember Me */}
                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label className="text-gray-600 text-sm">Remember Me</label>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Remember your password?{" "}
                            <button
                                className="text-[#2F8E5B] hover:underline"
                                onClick={() => router.push("/auth/login")}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;