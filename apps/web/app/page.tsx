import { Button } from "@repo/ui/components/ui/button";
import Navbar from "~/components/Navbar";

export default function Page() {
  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full">
        Home page
      </div>
    </main>
  );
}
