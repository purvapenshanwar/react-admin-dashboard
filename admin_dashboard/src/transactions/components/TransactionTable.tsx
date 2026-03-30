import TransactionRow from "./TransactionRow";

type Transaction = {
  id: string;
  client: string;
  partner: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
};

export default function TransactionTable({ data }: { data: Transaction[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-lime-600 text-white text-left">
            <th className="p-3">
              <input type="checkbox" />
            </th>
            <th className="p-3">Tracking ID</th>
            <th className="p-3">Client Name</th>
            <th className="p-3">Delivery Partner Name</th>
            <th className="p-3">Date & Time</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <TransactionRow key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}