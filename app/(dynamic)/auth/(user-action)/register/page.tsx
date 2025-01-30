'use client'
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { signIn } from 'next-auth/react';
import { AUTH_ERROR_MESSAGES } from "@/constants/authErrorMessages";

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
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callback");

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
            setError(AUTH_ERROR_MESSAGES[result.code!]);
            return;
        }

        setIsLoading(false);
        if(callbackUrl?.length) setTimeout(() => router.push(callbackUrl), 0);
        else router.push('/auth/first-login');
    };

    return (
        <div className="flex h-[100vh] w-screen justify-center bg-[#E5F7EB] items-center">
            <div className="md:h-[98vh] h-[80vh] md:w-[85vw]  lg:w-[48vw]   p-2 rounded-lg rounded-bl-[50px] bg-white flex flex-col md:flex-row items-center justify-between ">
                <div className="hidden h-full  md:flex md:w-2/5  lg:w-[20vw] justify-center">

                    <Image
                        src="/LandingPageImages/login page.png"
                        alt="Login Illustration"
                        className="lg:w-full rounded-2xl rounded-tr-[50px] rounded-bl-[50px]"
                        width={400}
                        height={200 / (9 / 16)}
                    />
                </div>


                <div className="h-full   flex justify-center px-4 flex-col   max-w-sm sm:max-w-md  md:w-1/2 lg:w-1/2">
                    {/* <h1 className="text-xl text-center text-slate-700 mb-4">
          Welcome Back to <span className="text-[#2F8E5B]">Jobgenix!</span>
        </h1> */}

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
                                onFocus={() => {
                                    if (!formData.phone) {
                                        handleInputChange({
                                            target: { name: "phone", value: "+91 " }
                                        } as React.ChangeEvent<HTMLInputElement>);
                                    }
                                }}
                                onBlur={() => {
                                    if (formData.phone.trim() === "+91") {
                                        handleInputChange({
                                            target: { name: "phone", value: "" }
                                        } as React.ChangeEvent<HTMLInputElement>);
                                    }
                                }}
                                onChange={(e) => {
                                    let input = e.target.value;
                                    if (!input.startsWith("+91 ")) {
                                        input = `+91 ${input.replace(/^\+91\s*/, "")}`;
                                    }
                                    handleInputChange({
                                        target: { name: "phone", value: input }
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
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
                            onClick={() =>callbackUrl? router.push(`/auth/login?callback=${callbackUrl}`) : router.push("/auth/login")}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Register;