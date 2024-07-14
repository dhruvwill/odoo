// "use client";

// import Navbar from "~/components/Navbar";
// import SearchBar from "~/components/dashboard/SearchBar";
// import { useUser } from "@clerk/nextjs";
// import Book from "~/components/dashboard/Book";
// export default function Page() {
//   const { isSignedIn, user } = useUser();
//   return (
//     <main>
//       <Navbar />
//       <div className="w-screen h-screen">
//         {isSignedIn && (
//           <div className="flex flex-col gap-3">
//             <h1 className="m-2 text-2xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
//                 Search Your
//               </span>{" "}
//               Favourite Books...
//             </h1>
//             <hr />
//             <SearchBar />
//             <div className="w-full flex gap-2">
//               <div className="w-1/2">
//                 <h1 className="semibold text-center w-full">New Arrivals...</h1>
//                 <div className="w-full ">
//                   <Book
//                     imageSrc=""
//                     title="Noteworthy technology acquisitions 2021"
//                     description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
//                     author="John Doe"
//                     publicationYear="2021"
//                     rating={4}
//                   />
//                 </div>
//               </div>
//               <div className="w-1/2">
//                 <h1 className="semibold text-center w-full">Trending...</h1>
//                 <div className="w-full">
//                   <Book
//                     imageSrc=""
//                     title="Noteworthy technology acquisitions 2021"
//                     description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
//                     author="John Doe"
//                     publicationYear="2021"
//                     rating={4}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import Navbar from "~/components/Navbar";
import SearchBar from "~/components/dashboard/SearchBar";
import { useUser } from "@clerk/nextjs";
import Book from "~/components/dashboard/Book";

export default function Page() {
  const { isSignedIn, user } = useUser();

  return (
    <main className="">
      <Navbar />
      <div className="w-full max-w-6xl px-4 py-8 mx-auto">
        {isSignedIn && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Search Your
              </span>{" "}
              Favourite Books...
            </h1>
            <hr className="border-gray-300 dark:border-gray-700" />
            <SearchBar />
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1">
                <h2 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
                  New Arrivals...
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <Book
                    imageSrc=""
                    title="Noteworthy technology acquisitions 2021"
                    description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    author="John Doe"
                    publicationYear="2021"
                    rating={4}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
                  Trending...
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <Book
                    imageSrc=""
                    title="Noteworthy technology acquisitions 2021"
                    description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    author="John Doe"
                    publicationYear="2021"
                    rating={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
