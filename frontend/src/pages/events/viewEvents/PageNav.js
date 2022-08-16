import React from "react";

const PageNav = ({ currentPage, setCurPage, totalNoOfPages }) => {
  return (
    <div>
      <button
        className="btn btn-secondary me-3 bg-dark text-primary border-primary"
        onClick={() => setCurPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      Page {currentPage} of {totalNoOfPages()}
      <button
        className="btn btn-secondary ms-3 bg-dark text-primary border-primary"
        onClick={() => setCurPage(currentPage + 1)}
        disabled={currentPage === totalNoOfPages()}
      >
        Next
      </button>
    </div>
  );
};

export default PageNav;
