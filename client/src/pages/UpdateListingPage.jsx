import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import GameCover from "../components/GameCover";
import ErrorPage from "../components/ErrorPage";
import states from "../mock/states.json";
import Button from "../components/Button";
import { Autocomplete, TextField, MenuItem } from "@mui/material";
import { useUserContext } from "../context/LoggedUserContext";
import TradeGamesPanel from "../components/TradeGamesPanel";
import CustomAlert from "../components/CustomAlert";
export default function UpdateListingPage() {
  const [pageState, setPageState] = useState(1);
  const { listingId } = useParams();
  const [gameTradeList, setGameTradeList] = useState([]);
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
  //setting up the error state for alert
  const [error, setError] = useState(null);
  const [tradeAccepted, setTradeAccepted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(true);
  const navigate = useNavigate();
  const { loggedUser } = useUserContext();

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
    if (listing.user !== loggedUser || !loggedUser) {
      setAccessGranted(false);
    } else {
      setAccessGranted(true);
    }
  }, [listing, loggedUser]);

  //   useEffect(() => {
  //     if (listing.user !== loggedUser) setAccessGranted(false);
  //   }, [listing]);

  useEffect(() => {
    setListing({ ...listing, gamesTrade: gameTradeList });
  }, [gameTradeList]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleNextBtn = () => {
    if (validateInput()) setPageState(pageState + 1);
  };

  const handleBackBtn = () => {
    setPageState(pageState - 1);
  };

  const handleTradeChange = (value) => {
    if (value) {
      setTradeAccepted(true);
      return;
    } else {
      setTradeAccepted(false);
      return;
    }
  };

  const validateInput = () => {
    switch (pageState) {
      case 1:
        if (!listing.condition) {
          setError("You must choose a condition.");
          return false;
        }
        if (!listing.paymentMethod) {
          setError("You must choose a payment method.");
          return false;
        }
        if (!listing.price) {
          setError("You must enter a price.");
          return false;
        }
        if (listing.price > 999 || listing.price < 0) {
          setError("You must enter a valid price.");
          return false;
        }
        if (!listing.state) {
          setError("You must choose a state.");
          return false;
        }
        if (!listing.description) {
          setError("You must write a description.");
          return false;
        }
        return true;
      case 2:
        if (listing.trade === "") {
          setError("You must choose a trade option.");
          return false;
        }
        if (listing.delivery === "") {
          setError("You must choose a delivery option.");
          return false;
        }
        if (listing.gamesTrade.length === 0 && listing.trade) {
          setError("You must choose at least one game for trade.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setListing({
      ...listing,
      [name]: value,
    });
  };

  const handleSubmission = async () => {
    if (validateInput()) {
      const res = await axios
        .patch(`/api/listings/${listingId}/update`, { listing: listing })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.error);
        });

      if (res.status === 200) {
        console.log("Listing updated successfully");
        navigate(`/listing/${listingId}`);
      } else {
        setError("An error has occured. Listing could not be created.");
        navigate(0);
      }
    }
  };

  let formStage = null;

  switch (pageState) {
    case 1:
      formStage = (
        <div className="flex flex-col">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4">
              <GameCover
                url={listing.coverURL}
                platform={listing.platform}
                rounded={true}
                textSize="text-sm"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <TextField
                    name="condition"
                    value={listing.condition}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Condition"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="New" value="New">
                      New
                    </MenuItem>
                    <MenuItem key="Used" value="Used">
                      Used
                    </MenuItem>
                  </TextField>
                </div>
                <div className="w-1/2">
                  <TextField
                    name="paymentMethod"
                    value={listing.paymentMethod}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Payment Method"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="Cash" value="Cash">
                      Cash
                    </MenuItem>
                    <MenuItem key="CreditCard" value="Credit Card">
                      Credit Card
                    </MenuItem>
                  </TextField>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <TextField
                    name="price"
                    value={listing.price}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                    }}
                    type="number"
                    label="Price"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                  />
                </div>
                <div className="flex flex-col w-1/2 space-y-1">
                  <Autocomplete
                    name="state"
                    value={listing.state}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, state: newValue });
                    }}
                    disablePortal
                    options={states}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        color="primary"
                        dark="true"
                        size="small"
                        label="State"
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row grow">
                <div className="flex flex-col grow">
                  <TextField
                    name="description"
                    value={listing.description}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                    }}
                    multiline="true"
                    rows="5"
                    label="Description"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    maxRows="5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row pt-10 justify-end">
            <Button
              text="Next"
              bgColor="bg-accent"
              textColor="text-text-dark"
              className="text-base py-1.5 px-6"
              onClick={handleNextBtn}
            />
          </div>
        </div>
      );
      break;
    case 2:
      formStage = (
        <div className="flex flex-col">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4 ">
              <GameCover
                url={listing.coverURL}
                platform={listing.platform}
                rounded={true}
                textSize="text-sm"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <TextField
                    name="trade"
                    value={listing.trade}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleTradeChange(e.target.value);
                    }}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Trade"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="yes" value={true}>
                      Yes
                    </MenuItem>
                    <MenuItem key="no" value={false}>
                      No
                    </MenuItem>
                  </TextField>
                </div>
                <div className="w-1/2">
                  <TextField
                    name="delivery"
                    value={listing.delivery}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Delivery"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="yes" value={true}>
                      Yes
                    </MenuItem>
                    <MenuItem key="no" value={false}>
                      No
                    </MenuItem>
                  </TextField>
                </div>
              </div>
              {tradeAccepted ? (
                <TradeGamesPanel
                  passTradeGamesList={(list) => {
                    setGameTradeList(list);
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-row pt-10">
            <Button
              text="Back"
              bgColor="bg-text-white"
              textColor="text-bg-dark"
              className="text-base py-1.5 px-6"
              onClick={handleBackBtn}
            />
            <div className="grow"></div>
            <Button
              text="Submit"
              bgColor="bg-accent"
              textColor="text-text-dark"
              className="text-base py-1.5 px-6"
              onClick={handleSubmission}
            />
          </div>
        </div>
      );
      break;
    default:
      formStage = null;
      break;
  }

  if (!accessGranted) return <ErrorPage />;
  return (
    <div>
      <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark flex flex-col space-y-6 p-10 mt-10">
        {formStage}
      </div>
      <CustomAlert type="error" message={error} fixed={true} timed={true} />
    </div>
  );
}
