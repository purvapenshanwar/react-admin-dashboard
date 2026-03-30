type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-between text-color- items-center mt-4 text-sm">
      <p>
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-2 rounded ${
              currentPage === i + 1
                ? "bg-lime-600 text-white"
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}