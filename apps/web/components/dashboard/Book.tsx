// components/BookCard.tsx
import React from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";
interface BookProps {
  imageSrc: string;
  title: string;
  description: string;
  author: string;
  publicationYear: string;
  rating: number;
}

const Book: React.FC<BookProps> = ({
  imageSrc,
  title,
  description,
  author,
  publicationYear,
  rating,
}) => {
  return (
    <a
      href="#"
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row"
    >
      <Image
        className="object-cover w-full h-48 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={imageSrc}
        alt={title}
        width={30}
        height={30}
      />
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="text-xs font-medium text-gray-900 dark:text-white">
          Author: {author}
        </p>
        <p className="text-xs font-medium text-gray-900 dark:text-white">
          Published: {publicationYear}
        </p>

        <Link href="#">
          <div className="flex mt-2 space-x-2">
            <button className="flex items-center px-2 py-1 text-xs font-medium text-gray-900 bg-gray-200 rounded-lg dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              <BookOpen className="w-3 h-3 mr-1" />
              Borrow Book
            </button>
          </div>
        </Link>
      </div>
    </a>
  );
};

export default Book;
