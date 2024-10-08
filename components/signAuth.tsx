import { signIn } from "next-auth/react";

export function SignInButton({ 
  children, 
  provider 
}: { 
  children: React.ReactNode;
  provider: "google" | "credentials";
}) {
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl: "/" })}
      className="p-4 border rounded-md hover:bg-gray-100"
    >
      {children}
    </button>
  );
}