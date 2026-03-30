import ShipmentRow from "./ShipmentRow";

export default function ShipmentTable({ data, setData }: any) {
  return (
    <div className="bg-white rounded-lg shadow overflow-visible">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3"></th>
            <th className="p-3">Tracking ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Pick up</th>
            <th className="p-3">Drop</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any, i: number) => (
            <ShipmentRow
              key={i}
              item={item}
              setData={setData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}