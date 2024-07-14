// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

const SignInPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
