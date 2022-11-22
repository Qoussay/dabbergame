import Hero from "../components/Hero";
import ListingsViewer from "../components/ListingsViewer";
import SortAndFilter from "../components/SortAndFilter";
import SectionTitle from "../components/SectionTitle";
import PopularPlatformSection from "../components/PopularPlatformSection";
export default function HomePage() {
  return (
    <div className="pt-8">
      <Hero />
      <SectionTitle title="Popular platforms" />
      <PopularPlatformSection />
      <SectionTitle title="Latest Listings" />
      <div className="py-6" id="listingsSection">
        <SortAndFilter />
        <ListingsViewer itemsPerPage={42} query={null} />
      </div>
    </div>
  );
}
