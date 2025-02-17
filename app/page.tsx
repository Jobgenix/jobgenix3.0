"use client";
import { Landing } from "@/app/components/landingPage";


export default function Page() {
  // const session = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (session.status === "unauthenticated") {
  //     router.push("/auth/login");
  //   }

  //   if (session.status === 'authenticated' && session.data?.user.role === ROLE_IDS.NEW_USER) {
  //     router.push("/auth/first-login");
  //   }
  // }, [session, router]);

  return (
    < >
      <Landing />
    </>
  );
}
