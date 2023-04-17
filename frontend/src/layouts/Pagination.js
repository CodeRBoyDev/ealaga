import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
    var last = pageNumbers.length;
    
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    <nav>
      <ul className="pagination" style={{ textAlign: "center" }}>
        <Link onClick={() => paginate(1)} className="page-link" to="">
          First
        </Link>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} to="" className="page-link">
              {number}
            </Link>
          </li>
        ))}
        <Link onClick={() => paginate(last)} className="page-link" to="">
          Last
        </Link>
      </ul>
    </nav>

    <style>
        {`
      @media only screen and (max-width: 768px) {
        .page-link {
          font-size: 12px;
        }
      }
        `}
      </style>

  </div>
  );
};

export default Pagination;