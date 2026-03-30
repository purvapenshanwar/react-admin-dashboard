import StatusBadge from "./StatusBadge";

type Transaction = {
  id: string;
  client: string;
  partner: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
};

export default function TransactionRow({ item }: { item: Transaction }) {
  return (
    <tr className="border-b border-dashed hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3 font-medium">{item.id}</td>
      <td className="p-3">{item.client}</td>
      <td className="p-3">{item.partner}</td>

      <td className="p-3 whitespace-pre-line text-gray-500">
        {item.date}
      </td>

      <td className="p-3 font-medium">{item.amount}</td>

      <td className="p-3">
        <StatusBadge status={item.status} />
      </td>

      <td className="p-3 cursor-pointer text-xl">⋮</td>
    </tr>
  );
}