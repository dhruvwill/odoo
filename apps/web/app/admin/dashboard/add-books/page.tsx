import SearchBar from "~/components/dashboard/SearchBar";
import BookCard from "~/components/dashboard/BookCard";

export default function page() {
  return (
    <div className="m-2">
      <SearchBar />
      <div className="m-2 p-2 shadow-xl w-full">
        <h1 className=" ">My Books</h1>
        <hr />
        <BookCard
          imageSrc="https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg"
          title="Book Title"
          description="The book description is the pitch to the reader about why they should buy your book. When done right, it directly drives book sales."
          timeRemaining="5 days"
        />
        <BookCard
          imageSrc=""
          title="Book Title"
          description="The book description is the pitch to the reader about why they should buy your book. When done right, it directly drives book sales."
          timeRemaining="5 days"
        />
      </div>
    </div>
  );
}
