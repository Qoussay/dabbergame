import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ListingsViewer from "../components/ListingsViewer";
import SortAndFilter from "../components/SortAndFilter";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className=" bg-bg-medium desktop:px-80 laptop:px-60 pt-14">
        <Hero />
        <hr></hr>
        <div className="py-6">
          <SortAndFilter />
          <ListingsViewer itemsPerPage={42} />
        </div>
      </div>
    </div>
  );
}
