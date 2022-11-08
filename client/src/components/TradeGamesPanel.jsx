export default function TradeGamesPanel() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-1 grow">
          <div className="text-text-white">Games accepted for trade:</div>
          <input
            type="text"
            className="pl-5 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none"
            placeholder="Choose games"
          />
        </div>
      </div>
      <div className="flex flex-row">
        {/* This is where the games will be displayed */}
      </div>
    </div>
  );
}
