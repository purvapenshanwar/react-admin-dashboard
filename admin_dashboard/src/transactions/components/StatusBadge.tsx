type Props = {
  status: "Completed" | "Pending" | "Failed";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}