import { Button } from "./ui/button";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2">
      <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
        Previous
      </Button>
      <span className="text-gray-600 dark:text-gray-300 px-2">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
