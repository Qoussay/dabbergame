import { useParams } from "react-router-dom";
import UserReviewsScore from "../components/UserReviewsScore";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/LoggedUserContext";
import { Backdrop, CircularProgress } from "@mui/material";
export default function AddReviewPage() {
  const { username } = useParams();

  const navigate = useNavigate();
  const { loggedUser } = useUserContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/user/${username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(username);
  }, []);

  if (!user) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div>
      <div className="text-accent text-2xl pl-4 py-6">
        How was your experience?
      </div>

      <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark space-y-6 flex flex-row p-8">
        {/* left panel  */}
        <div className="flex flex-col w-1/3 space-y-2">
          <div className="flex flex-row space-x-4 place-items-center">
            <img
              src={process.env.PUBLIC_URL + "/userImage.png"}
              className="w-1/6 h-fit"
            ></img>
            <div className="flex flex-col justify-center space-y-1">
              <div className=" text-text-white desktop:text-2xl laptop:text-xl">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-text-light desktop:text-xl laptop:text-base">
                {username}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow space-y-3 justify-start">
          <div className="flex flex-col grow">
            <div className="text-text-white">Review</div>
            <textarea
              value=""
              className="focus:shadow-accent focus:border-accent focus:outline-none rounded-lg pl-5 px-0.5 h-full"
            />
          </div>
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col grow space-y-1">
              <div className="text-text-white">Score</div>
              <input
                type="number"
                className="pl-5 py-0. rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none"
                placeholder="Score"
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button
                text="Submit"
                bgColor="bg-accent"
                textColor="text-text-dark"
                className="text-base py-1.5 px-6 rounded-full"
                onClick={() => navigate(`/user/${username}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
