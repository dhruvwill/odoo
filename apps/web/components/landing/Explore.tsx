import Link from "next/link";
import React from "react";

type Props = {};

const Explore = (props: Props) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore by Genre
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-[700px] mx-auto">
            Browse our collection by your favorite genres.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <BookIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Fiction
            </span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <TextIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Non-Fiction
            </span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <MicroscopeIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Mystery
            </span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <HeartIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Romance
            </span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <WandIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Fantasy
            </span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            prefetch={false}
          >
            {/* <UserIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
            <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
              Biography
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Explore;

// function BookIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//     </svg>
//   );
// }

// function HeartIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//     </svg>
//   );
// }

// function MicroscopeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 18h8" />
//       <path d="M3 22h18" />
//       <path d="M14 22a7 7 0 1 0 0-14h-1" />
//       <path d="M9 14h2" />
//       <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
//       <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
//     </svg>
//   );
// }

// function TextIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17 6.1H3" />
//       <path d="M21 12.1H3" />
//       <path d="M15.1 18H3" />
//     </svg>
//   );
// }

// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );
// }

// function WandIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 4V2" />
//       <path d="M15 16v-2" />
//       <path d="M8 9h2" />
//       <path d="M20 9h2" />
//       <path d="M17.8 11.8 19 13" />
//       <path d="M15 9h0" />
//       <path d="M17.8 6.2 19 5" />
//       <path d="m3 21 9-9" />
//       <path d="M12.2 6.2 11 5" />
//     </svg>
//   );
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
