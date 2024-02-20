import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import NewsDataService from "../services/news.services";
import NewsContent from "./NewsContent";

const NewsList: React.FC = () => {
  const [newsInfos, setNewsInfos] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 5;

  useEffect(() => {
    NewsDataService.getAll().then((response) => {
      console.log(response.data[0]);
      setNewsInfos(response.data);
      setLoading(false);
    });
  }, []);

  const totalPageCount = Math.ceil(newsInfos.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsInfos = newsInfos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ol className="list-group">
        {currentNewsInfos.map((item: number, index) => (
          <Link to={`/comments/${item}`}>
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={item}
            >
              <NewsContent id={item}></NewsContent>
            </li>
          </Link>
        ))}
      </ol>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {/* Render "Previous" button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Render page numbers or ellipsis */}
          {pageNumbers.map((number, index) => {
            const isCurrentPage = number === currentPage;

            if (
              index === 0 ||
              index === totalPageCount - 1 ||
              Math.abs(currentPage - number) < maxVisiblePages / 2
            ) {
              return (
                <li
                  key={number}
                  className={`page-item ${isCurrentPage ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            } else if (index === 1 && currentPage > maxVisiblePages / 2) {
              // Render the first ellipsis
              return (
                <li key={`ellipsis-start`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            } else if (
              index === totalPageCount - 2 &&
              currentPage < totalPageCount - maxVisiblePages / 2
            ) {
              // Render the second ellipsis
              return (
                <li key={`ellipsis-end`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            }

            return null;
          })}

          {/* Render "Next" button */}
          <li
            className={`page-item ${
              currentPage === totalPageCount ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewsList;
