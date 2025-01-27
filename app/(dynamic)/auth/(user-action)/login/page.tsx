'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash ,faLock} from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { AUTH_ERROR_MESSAGES } from "@/constants/authErrorMessages";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';


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
      if (user) router.push("/");
    }
  }, [router]);

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

    else if(result?.ok){
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="flex h-[100vh] w-screen justify-center bg-[#E5F7EB] items-center">
      <div className="md:h-[98vh] h-[80vh] md:w-[85vw]  lg:w-[48vw]   p-2 rounded-lg bg-white flex flex-col md:flex-row items-center justify-between ">
      <div className="hidden h-full  md:flex md:w-2/5  lg:w-[20vw] justify-center">
        
      <Image
          src="/LandingPageImages/login page.png"
          alt="Login Illustration"
          className="lg:w-full  rounded-2xl"
          width={400}
          height={200}
          
        />
      </div>

      <div className="h-full   flex justify-center px-4 flex-col   max-w-sm sm:max-w-md  md:w-1/2 lg:w-1/2">
    
        <h1 className="text-xl text-center text-slate-700 mb-6">
          Welcome Back to <span className="text-[#2F8E5B]">Jobgenix!</span>
        </h1>

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

          <div className="mb-4 flex flex-col justify-center gap-1">
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
            <div className="text-[#01A768] text-[12px] px-1 cursor-pointer">
            <FontAwesomeIcon icon={faLock}  className=" w-[22px]"/>
              Forgot password?</div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#2F8E5B] text-white font-bold rounded-xl hover:bg-[#329761] transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="px-4 text-gray-500 text-sm">Or sign in with</span>
        </div>

        <button onClick={()=>signIn('google')} className="w-full text-center justify-center px-1 py-2 mb-3 bg-white text-gray-600  border-2 border-slate-200 flex items-center hover:bg-gray-100 transition">
          <Image
            src="/images/googlelcon.svg"
            alt="Google logomark"
            width={20}
            height={20}
          />
          <span className="w-11/12">Login with Google</span>
        </button>

        <button className="w-full py-2 mb-6 bg-white text-gray-600   border-2 border-slate-200 flex items-center justify-center hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faLinkedin} className="text-blue-500  px-1 text-xl" width={20} height={20} />
          <span className="w-11/12">Login with LinkedIn</span>
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 rounded-xl border-2 border-slate-200 py-2">
          Don&apos;t have an account?{" "}
          <button className="text-[#2F8E5B] hover:underline" onClick={() => router.push("/auth/register")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
