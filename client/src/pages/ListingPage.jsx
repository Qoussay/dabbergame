// When you get to this pageXOffset, search the listing via ID
import { useParams } from "react-router-dom";
export default function ListingPage() {
  const { listingId } = useParams();
  return (
    <div className=" bg-bg-medium desktop:px-80 laptop:px-60 pt-14">
      <h1>Listing page for listing {listingId}</h1>
    </div>
  );
}
