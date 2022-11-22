import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function UpdateListingPage() {
  const [pageState, setPageState] = useState(0);
  const [listing, setListing] = useState({
    user: "",
    state: "",
    gameName: "",
    coverURL: "",
    platform: "",
    price: "",
    condition: "",
    paymentMethod: "",
    delivery: "",
    trade: "",
    description: "",
    gamesTrade: [],
  });
  const { listingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`/api/listings/${listingId}`).catch((err) => {
        console.log(err);
      });

      setListing(res.data);
    }

    getData();
  }, [listingId]);

  useEffect(() => {
    console.log(listing);
  }, [listing]);

  return (
    <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark flex flex-col space-y-6 p-10 mt-10">
      YOOOO
    </div>
  );
}
