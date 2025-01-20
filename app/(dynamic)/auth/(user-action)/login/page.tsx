'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { AUTH_ERROR_MESSAGES } from "@/constants/authErrorMessages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) router.push("/home");
    }
  }, [router]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      alert("All fields are required.");
      return;
    }

    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(AUTH_ERROR_MESSAGES[result.code!]);
      console.log(result);
      setIsLoading(false);
      return;
    }

    else if(result?.ok){
      setIsLoading(false);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
        <Image
          src="/images/loginImage.png"
          alt="Login Illustration"
          className="w-full max-w-sm md:max-w-md border rounded-2xl"
          width={400}
          height={400}
          priority
        />
      </div>

      <div className="p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg md:w-1/2 lg:w-2/5">
        <h5>👋Hi, Unbeatable</h5>
        <h1 className="text-2xl font-bold text-slate-700 mb-6">
          Welcome Back to <span className="text-[#2F8E5B]">JobGenix!</span>
        </h1>

        <button onClick={()=>signIn('google')} className="w-full text-center justify-center py-2 mb-3 bg-white text-gray-600 font-bold border-2 border-slate-100 flex items-center hover:bg-gray-100 transition">
          <Image
            src="/images/googlelcon.svg"
            alt="Google logomark"
            width={20}
            height={20}
          />
          <span className="w-11/12">Continue with Google</span>
        </button>

        <button className="w-full py-2 mb-6 bg-white text-gray-600 font-bold border-2 border-slate-100 flex items-center justify-center hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faLinkedin} className="text-blue-500 text-xl" width={20} height={20} />
          <span className="w-11/12">Login with LinkedIn</span>
        </button>

        <div className="flex items-center justify-center my-4">
          <span className="px-4 text-gray-500 text-sm">Or sign in with email</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl">
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-none rounded-2xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-xl relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-none rounded-2xl focus:outline-none pr-10"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 text-[#2F8E5B] cursor-pointer"
                onClick={togglePasswordVisibility}
                width={18}
                height={18}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 rounded-xl border py-2">
          Don&apos;t have an account?{" "}
          <button className="text-[#2F8E5B] hover:underline" onClick={() => router.push("/auth/register")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
