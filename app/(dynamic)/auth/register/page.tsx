'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { signIn } from 'next-auth/react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            phone,
            gender,
            password,
            confirmPassword,
        } = formData;

        if (!firstName || !lastName || !email || !phone || !gender || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setIsLoading(true);
        console.log(formData);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            firstName,
            lastName,
            phoneNumber: phone,
            gender,
            signUp: 'on',
        });

        if (result?.error) {
            setError("User Already Exists");
            console.log(result.error);
            return;
        }


    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
                <Image
                    src="/images/loginImage.png"
                    alt="Signup Illustration"
                    width={400}
                    height={400}
                    className="w-full max-w-sm md:max-w-md border rounded-2xl"
                    priority
                />
            </div>

            <div className="p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg md:w-1/2 lg:w-2/5">
                <h1 className="text-2xl font-bold text-slate-700 mb-6">
                    Ready to Be <span className="text-[#2F8E5B]">Unstoppable!</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                    </div>

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

                    {/* Phone */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none pr-10"
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="absolute top-3 right-3 text-[#2F8E5B] cursor-pointer"
                            onClick={togglePasswordVisibility}
                            width={18}
                            height={18}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none pr-10"
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="absolute top-3 right-3 text-[#2F8E5B] cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                            width={18}
                            height={18}
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        className="text-[#2F8E5B] hover:underline"
                        onClick={() => router.push("/auth/login")}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
