import Button from "./Button";
export default function Hero() {
  return (
    <div className="mb-16 space-y-12">
      {/* title of the hero section */}
      <h1 className="text-2xl w-1/2 mx-auto text-center text-text-white font-semibold leading-relaxed">
        Find all the game listings and deals you want and more!
      </h1>
      {/* container for the form  */}
      <div className="bg-bg-light w-full rounded-lg shadow-md shadow-bg-dark flex flex-col p-10 space-y-8">
        {/* check boxes for trading and selling  */}
        <div className="flex flex-row space-x-8 text-text-white ">
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              id="toSellCB"
              name="toSellCB"
              value="toSell"
            />
            <p>To Sell</p>
          </div>
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              id="toTradeCB"
              name="toTradeCV"
              value="toTrade"
            />
            <p>To Trade</p>
          </div>
        </div>
        {/* search fields  */}
        <form className="flex flex-row space-x-6">
          <div className="flex-auto flex flex-row">
            <input
              type="text"
              placeholder="All Platforms"
              className="w-1/4 pl-5 py-1 border-2 border-r-0 rounded-l-full border-text-dark "
            ></input>
            <input
              type="text"
              placeholder="Search for a game"
              className="flex-auto pl-5 py-1 border-2 rounded-r-full border-text-dark  "
            ></input>
          </div>
          <input
            type="text"
            placeholder="All Tunisia"
            className="w-1/5 pl-5 py-1 border-2 rounded-full border-text-dark  "
          ></input>
        </form>
        {/* submit buttons */}
        <div className="flex flex-row space-x-6 justify-center">
          <Button
            text="Search"
            bgColor="bg-bg-medium"
            textColor="text-text-white"
            className="py-1.5 px-3 "
          />
          <Button
            text="Post a listing"
            bgColor="bg-accent"
            textColor="text-text-dark"
            className="py-1.5 px-3 "
          />
        </div>
      </div>
    </div>
  );
}
