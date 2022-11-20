import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Rating, TextField } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
export default function ReviewModal({
  open,
  closeButtonClick,
  target,
  source,
}) {
  const [score, setScore] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateInput = () => {
    if (score === 0) {
      setError("You must enter a score.");
      return false;
    }
    if (!body) {
      setError("You must enter a review message.");
      return false;
    }
    return true;
  };

  const saveReview = async () => {
    const res = await axios
      .post("/api/reviews", {
        review: {
          source: source,
          target: target,
          message: body,
          rate: score,
        },
      })
      .catch((err) => {
        setError("Error saving the review. Try again.");
        return;
      });

    if (res.status === 200) {
      navigate(0);
    }
  };

  const handleSubmission = async () => {
    try {
      if (validateInput()) saveReview();
    } catch {
      console.log("error saving the review");
    }
  };
  if (!open) return null;
  return (
    <div className="w-full h-full fixed pt-16 bg-dark-bg z-10 laptop:-ml-60 desktop:-ml-80 -mt-24">
      <div className="bg-bg-light shadow-md px-4 shadow-bg-dark rounded-lg laptop:w-1/3 desktop:w-[28%] h-fit mx-auto flex flex-col py-3 z-10 mt-20">
        <div className="flex flex-row justify-end">
          <h1 className=" text-2xl text-accent text-left flex-auto ">
            Add a Review
          </h1>
          <div
            className="text-text-white text-lg hover:cursor-pointer hover:brightness-120 hover:scale-105 transition-all duration-300"
            onClick={closeButtonClick}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
        <div className="text-text-white pt-8 pb-4 text-lg">
          How was your experience ?
        </div>
        {/* rating the user */}
        <div className="flex flex-col space-y-1.5">
          <div className="text-text-light">Rate the user</div>
          <Rating
            name="half-rating"
            defaultValue={0}
            precision={0.5}
            onChange={(e) => {
              setScore(e.target.value);
            }}
            emptyIcon={
              <FontAwesomeIcon
                icon={faStar}
                className=" text-gray-400 pr-0.5"
              />
            }
            icon={
              <FontAwesomeIcon icon={faStar} className="text-accent pr-0.5" />
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5 py-4">
          <div className="text-text-light">Write a review</div>
          <TextField
            name="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            sx={{
              background: "#fff",
              borderRadius: "5px",
            }}
            multiline="true"
            rows="3"
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            maxRows="3"
          />
        </div>
        <CustomAlert type="error" message={error} fixed={false} timed={false} />
        <Button
          text="Submit"
          bgColor="bg-accent"
          textColor="text-bg-dark"
          className={`text-sm py-1.5 w-fit ml-auto mb-4 ${
            error ? "mt-4" : null
          }`}
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
}
