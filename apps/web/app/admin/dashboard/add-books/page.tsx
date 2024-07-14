import SearchBar from "~/components/dashboard/SearchBar";
import BookCard from "~/components/dashboard/BookCard";

export default function page() {
  return (
    <div className="m-2">
      <SearchBar />
      <div className="m-2 p-2 shadow-xl">
        <BookCard
          imageSrc=""
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
          tags={["Technology", "Acquisitions", "2021"]}
        />
      </div>
    </div>
  );
}
