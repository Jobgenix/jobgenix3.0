'use client'
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { AUTH_ERROR_MESSAGES } from "@/constants/authErrorMessages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required.");
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

    if (result?.ok) {
      setIsLoading(false);
      console.log(callbackUrl);
      if (callbackUrl?.length) setTimeout(() => router.push(callbackUrl), 0);
      else router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen w-screen justify-center bg-[#E5F7EB] items-center">
      <div className="md:h-[90vh] h-[85vh] max-md:w-4/5 lg:w-[50vw] p-2 rounded-lg md:rounded-bl-[50px] bg-white flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Image Section (Hidden on small screens) */}
        <div className="hidden md:flex h-full w-2/5 justify-center">
          <Image
            src="/LandingPageImages/login page.png"
            alt="Login Illustration"
            className="w-full rounded-2xl rounded-tr-[50px] rounded-bl-[50px]"
            width={400}
            height={200 / (9 / 16)}
          />
        </div>

        {/* Login Form */}
        <div className="h-full w-full flex justify-center px-6 flex-col max-w-sm sm:max-w-md md:w-3/5">
          <h1 className="text-xl text-center text-slate-700 mb-6">
            Welcome Back to <span className="text-[#2F8E5B]">Jobgenix!</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border overflow-hidden border-gray-300 rounded-md">
                <input
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-none focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col justify-center gap-1">
              <div className="flex items-center border overflow-hidden border-gray-300 rounded-md relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-none focus:outline-none pr-10"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="absolute right-3 text-[#2F8E5B] cursor-pointer"
                  onClick={togglePasswordVisibility}
                  width={18}
                  height={18}
                />
              </div>
              <div
                className="text-[#01A768] text-[12px] px-1 cursor-pointer"
                onClick={() => router.push('/auth/forgot-password')}
              >
                <FontAwesomeIcon icon={faLock} width={22} height={22} className="w-[22px]" />
                Forgot password?
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-md hover:bg-[#329761] transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="px-4 text-gray-500 text-sm">Or sign in with</span>
          </div>

          <button
            onClick={() => callbackUrl?.length ? signIn('google', { redirectTo: callbackUrl }) : signIn('google')}
            className="w-full text-center justify-center px-1 py-2 mb-3 bg-white text-gray-600 rounded-md border-2 border-slate-200 flex items-center hover:bg-gray-100 transition"
          >
            <Image
              src="/images/googlelcon.svg"
              alt="Google logomark"
              width={20}
              height={20}
            />
            <span className="w-11/12">Login with Google</span>
          </button>

          <button className="w-full py-2 mb-6 bg-white text-gray-600 rounded-md border-2 border-slate-200 flex items-center justify-center hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faLinkedin} className="text-blue-500 px-1 text-xl" width={20} height={20} />
            <span className="w-11/12">Login with LinkedIn</span>
          </button>

          <p className="mt-4 text-center text-sm text-gray-600 rounded-md border-2 border-slate-200 py-2">
            Don&apos;t have an account?{" "}
            <button
              className="text-[#2F8E5B] hover:underline"
              onClick={() =>
                callbackUrl?.length
                  ? router.push(`/auth/register?callback=${encodeURI(callbackUrl)}`)
                  : router.push("/auth/register")
              }
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
