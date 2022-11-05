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
    <div className="grid grid-cols-5 gap-4">
      {listings.map((listing) => {
        return <ProfileListingCard listing={listing} />;
      })}
    </div>
  );
}
