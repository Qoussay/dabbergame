import Select from "react-select";
export default function SortAndFilter() {
  const sortOptions = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
    { value: "option4", label: "option4" },
    { value: "option5", label: "option5" },
  ];
  return (
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
  );
}
