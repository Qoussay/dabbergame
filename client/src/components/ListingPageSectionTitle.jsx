export default function ListingPageSectionTitle({ title }) {
  return (
    <div className="flex flex-row text-text-white text-2xl space-x-4 font-semibold mt-10 mb-5">
      <div>{title}</div>
      <div className=" flex flex-col justify-center grow">
        <hr></hr>
      </div>
    </div>
  );
}
