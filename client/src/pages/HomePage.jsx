import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className=" bg-bg-medium pt-16">
        <Hero />
      </div>
    </div>
  );
}
