import Select from "react-select";
import data from "../mock/listings.json";
import ListingCard from "./ListingCard";

const sortOptions = [
  { value: "option1", label: "option1" },
  { value: "option2", label: "option2" },
  { value: "option3", label: "option3" },
  { value: "option4", label: "option4" },
  { value: "option5", label: "option5" },
];

export default function ListingsViewer() {
  console.log(data);
  return (
    <div className="py-6">
      {/* filters and sort */}
      <form className="flex flex-row space-x-5">
        <Select
          options={sortOptions}
          placeholder="Sort By:"
          className="w-1/6 rounded-lg"
        />

        <p className="text-3xl text-text-white">|</p>
        <Select
          options={sortOptions}
          placeholder="Platform:"
          className="w-[12%] rounded-lg"
        />
        <Select
          options={sortOptions}
          placeholder="State:"
          className="w-[12%] rounded-lg"
        />
        <Select
          options={sortOptions}
          placeholder="Condition:"
          className="w-[12%] rounded-lg"
        />
      </form>
      <div className="grid grid-cols-6 gap-6 py-8">
        {data.map((listing) => {
          return <ListingCard data={listing} />;
        })}
      </div>
    </div>
  );
}

// TO-DO:
// modify the Select tag
