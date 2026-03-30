import { CiSearch } from "react-icons/ci";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center border rounded-md px-2 w-64 ">
        <CiSearch className="text-gray-400 mr-2" />
    <input
      type="text"
      placeholder="Search..."
    //   className="border px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-lime-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
     </div>
  );
}