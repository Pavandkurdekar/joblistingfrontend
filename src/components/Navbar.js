import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Reference to the collapse element
  const collapseRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/searchjobs?profile=${searchTerm}`
      );
      setSearchResults(response.data);
      setShowResults(true); // Show the search results
      // Close the navbar toggle (collapse) when a link is clicked
      collapseRef.current.classList.remove("show");
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
  };

  const handleHireTalentClick = () => {
    // Reset search results when "Hire Talent" is clicked
    setShowResults(false);
    // Close the navbar toggle (collapse) when a link is clicked
    collapseRef.current.classList.remove("show");
  };

  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HIRE TALENT/GET JOB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ref={collapseRef}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={() => collapseRef.current.classList.remove("show")} // Close toggle
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={() => collapseRef.current.classList.remove("show")} // Close toggle
                >
                  Show All Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/addjobs"
                  onClick={() => {
                    handleHireTalentClick();
                    collapseRef.current.classList.remove("show"); // Close toggle
                  }}
                >
                  Hire Talent
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Jobs..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mt-4" style={{ width: "75%" }}>
        {showResults && (
          <div>
            {searchResults.map((job) => (
              <div className="py-4" key={job.id}>
                <div
                  className="card text-center"
                  style={{
                    borderColor: "gray",
                    borderRadius: "10px",
                    borderWidth: "4px",
                  }}
                >
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#827976" }}
                  >
                    <b>{job.profile}</b>
                  </div>
                  <div className="card-body">
                    <p className="card-title" style={{ fontSize: "9px" }}>
                      {job.description}
                    </p>
                    <p className="card-text">Experience: {job.exp} Years</p>
                    <div>
                      <span className="badge text-bg-danger mb-2">
                        REQUIRED SKILLS
                      </span>
                    </div>
                    <span className="badge text-bg-secondary">{job.tech1}</span>
                    <span className="badge text-bg-secondary">{job.tech2}</span>
                    <span className="badge text-bg-secondary">{job.tech3}</span>
                    <span className="badge text-bg-secondary">{job.tech4}</span>
                    <span className="badge text-bg-secondary">{job.tech5}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
