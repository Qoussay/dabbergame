import { useParams } from "react-router-dom";
import users from "../mock/users.json";
import UserReviewsScore from "../components/UserReviewsScore";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function AddReviewPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = users.filter((tempUser) => tempUser.username === username)[0];
  return (
    <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark flex flex-col space-y-6">
      <div className="flex flex-row space-x-4 px-2 bg-bg-dark shadow-md rounded-t-lg shadow-bg-dark py-3">
        <div className="flex flex-col justify-center grow">
          <hr className="border-accent" />
        </div>
        <div className="text-accent text-2xl">Add a Review</div>
        <div className="flex flex-col justify-center grow">
          <hr className="border-accent" />
        </div>
      </div>
      <div className="p-8 flex flex-row">
        {/* left panel  */}
        <div className="flex flex-row w-1/2 space-x-6">
          <img
            src={process.env.PUBLIC_URL + "/userImage.png"}
            className="w-1/3"
          ></img>
          <div className="flex flex-col w-1/3 justify-center">
            <div className=" text-text-white desktop:text-2xl laptop:text-xl">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-text-light desktop:text-xl laptop:text-base">
              {username}
            </div>
            <div className=" text-text-white desktop:text-xl laptop:text-lg py-3">
              <UserReviewsScore username={username} />
            </div>
            <div className="flex flex-col space-y-1">
              <div className=" text-text-light desktop:text-lg laptop:text-base">
                {user.state}
              </div>
              <div className="text-text-medium desktop:text-lg laptop:text-base">
                {user.dateJoined}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow space-y-3">
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
