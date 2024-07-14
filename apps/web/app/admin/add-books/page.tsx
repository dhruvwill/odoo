import SearchBar from "~/components/dashboard/SearchBar";
import BookCard from "~/components/dashboard/BookCard";

export default function page() {
  return (
    <div className="m-2">
      <SearchBar />
      <div className="m-2 p-2 shadow-xl">
        <BookCard
          imageSrc=""
          title="Book Title"
          description="The book description is the pitch to the reader about why they should buy your book. When done right, it directly drives book sales."
          tags={["Technology", "Acquisitions", "2021"]}
        />
        <BookCard
          imageSrc=""
          title="Book Title"
          description="The book description is the pitch to the reader about why they should buy your book. When done right, it directly drives book sales."
          tags={["Technology", "Acquisitions", "2021"]}
        />
      </div>
    </div>
  );
}
