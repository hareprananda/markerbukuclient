import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Pagination = ({ lastPage = 15, currentPage = 1 }) => {
  return (
    <div className="pagination__container">
      <div className="pagination__button chevron">
        <ChevronLeftIcon color="inherit" fontSize="inherit" />
      </div>

      {[1, 2, 3, "...", 1500].map((value) => (
        <div className={`pagination__button ${value == 1 ? "active" : ""}`}>
          <span>{value}</span>
        </div>
      ))}

      <div className="pagination__button chevron">
        <ChevronRightIcon color="inherit" fontSize="inherit" />
      </div>
    </div>
  );
};
export default Pagination;
