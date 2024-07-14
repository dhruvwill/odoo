// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

const SignUpPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
