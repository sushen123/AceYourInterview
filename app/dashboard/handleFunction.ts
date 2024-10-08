import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import router = useRouter()

export const handleSignOut = async () => {
    try {
      console.log("Sushen Oli")
      const data = await signOut({ redirect: false, callbackUrl: "/signin" });
      console.log("Sign out response:", data);
      router.push("/signin");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };
 