import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Navbar from "~/components/Navbar";

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      // Add other router methods you use
    };
  },
  usePathname() {
    return '/';
  },
}));

describe("Page", () => {
  it("renders a button", () => {
    render(<Navbar />);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();
  });
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
  it("renders a paragraph", () => {
    render(<Page />);

    const heading = screen.getByRole("paragraph");

    expect(heading).toBeInTheDocument();
  });
});
