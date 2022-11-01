export default function ListingUserReviewPanel({ data }) {
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-col justify-center w-1/6">
        <img
          src={process.env.PUBLIC_URL + "/userImage.png"}
          className="h-fit"
        ></img>
      </div>
      <div className="flex flex-col grow justify-center">
        {/* first row of name rate and date  */}
        <div className="flex flex-row space-x-1">
          <div className="text-accent text-sm font-semibold">{data.source}</div>
          <div className="text-text-white text-sm">({data.rate})</div>
          <div className="text-text-medium text-xs grow text-right">
            {data.date}
          </div>
        </div>
        <div className="text-text-white">{data.message}</div>
      </div>
    </div>
  );
}
