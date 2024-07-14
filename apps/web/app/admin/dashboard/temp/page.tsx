"use client";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const demoSearchValue = "rich dad poor dad";
  useEffect(() => {
    async function fetchBooks() {
      const res = await axios.get(
        `/api/books?q=${encodeURIComponent(demoSearchValue)}`,
      );
      console.log(res);
    }
    fetchBooks();
  }, []);

  return <div></div>;
};

export default Page;
