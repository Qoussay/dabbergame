import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ListingsViewer from "../components/ListingsViewer";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className=" bg-bg-medium px-80 pt-14">
        <Hero />
        <hr></hr>
        <ListingsViewer />
      </div>
    </div>
  );
}
