import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [Jobs, setJobs] = useState([]); // Changed SetJobs to setJobs

  useEffect(() => {
    loadJobs(); // Changed loadjobs to loadJobs
  }, []);

  const loadJobs = async () => {
    // Changed loadjobs to loadJobs
    try {
      const response = await axios.get("http://localhost:8080/getalljobs");
      setJobs(response.data); // Extract data from the response
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  return (
    <div>
      {Jobs.map((job) => (
        <div className="container" style={{ width: "75%" }} key={job.id}>
          <div className="py-4">
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
                <p className="card-text" style={{ fontSize: "10px" }}>
                  <b>Experience: {job.exp} Years</b>{" "}
                </p>
                <div>
                  <span className="badge text-bg-danger mb-2">
                    REQUIRED SKILLS
                  </span>
                </div>
                <span className="badge text-bg-secondary" style={{}}>
                  {job.tech1}
                </span>
                <span className="badge text-bg-secondary">{job.tech2}</span>
                <span className="badge text-bg-secondary">{job.tech3}</span>
                <span className="badge text-bg-secondary">{job.tech4}</span>
                <span className="badge text-bg-secondary">{job.tech5}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
