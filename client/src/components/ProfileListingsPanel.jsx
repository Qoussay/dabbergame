import SortAndFilter from "./SortAndFilter";
import ProfileListingCard from "./ProfileListingCard";
export default function ProfileListingsPanel({ listings }) {
  if (listings.length === 0) {
    return (
      <div className="text-lg text-text-white text-center">
        The user has no listings
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row">
        <SortAndFilter className="grow" />
        <form className="flex flex-col justify-center">
          <input
            type="text"
            className="w-full pl-5 py-0.5 rounded-full"
            placeholder="Search for a game"
          />
        </form>
      </div>
      <div className="grid desktop:grid-cols-6 laptop:grid-cols-5 gap-4">
        {listings.map((listing) => {
          return <ProfileListingCard listing={listing} />;
        })}
      </div>
    </div>
  );
}
