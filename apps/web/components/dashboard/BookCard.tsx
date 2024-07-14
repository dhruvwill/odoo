// components/BookCard.tsx
import React from "react";
import Image from "next/image";
import { FileClock } from "lucide-react";
import Link from "next/link";

interface BookCardProps {
  imageSrc: string;
  title: string;
  description: string;
  timeRemaining: string;
}

const BookCard: React.FC<BookCardProps> = ({
  imageSrc,
  title,
  description,
  timeRemaining,
}) => {
  return (
    <div className="flex w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Image
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={imageSrc}
        width={30}
        height={30}
        alt={title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center mt-2 text-red-800 dark:text-red-200 gap-2">
          <FileClock />
          <span className="text-sm font-semibold">
            Expires In: {timeRemaining}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
