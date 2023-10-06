import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addjobs = () => {
  let navigate = useNavigate();

  const [job, setJob] = useState({
    profile: "",
    description: "",
    exp: "",
    tech1: "",
    tech2: "",
    tech3: "",
    tech4: "",
    tech5: "",
  });

  const { profile, description, exp, tech1, tech2, tech3, tech4, tech5 } = job;

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the input is a checkbox and update its value as a string
    if (type === "checkbox") {
      if (checked) {
        setJob({ ...job, [name]: value });
      } else {
        setJob({ ...job, [name]: "" }); // Set it to an empty string when unchecked
      }
    } else {
      setJob({ ...job, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/postjob", job);
      navigate("/");
      window.alert("Job Posted Successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };
  const cancel = () => {
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div
          className="container"
          style={{
            width: "75%",
            borderRadius: "10px",
            border: "3px solid gray",
            backgroundColor: "gray",
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Job Profile
            </label>
            <input
              type="text"
              required
              pattern=".{10,}"
              title="Please enter at least 10 characters"
              minlength="10"
              style={{ backgroundColor: "#aaa3a3" }}
              value={profile}
              className="form-control"
              id="exampleFormControlInput1"
              name="profile"
              placeholder="Enter Job Profile here..."
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              required
              pattern=".{10,}"
              title="Please enter at least 10 characters"
              minlength="10"
              id="exampleFormControlTextarea1"
              style={{ backgroundColor: "#aaa3a3" }}
              rows="3"
              value={description}
              name="description"
              placeholder="Enter Job Description here..."
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
          <div>
            Experience:
            <input
              type="number"
              defaultValue={0}
              min={0}
              style={{ backgroundColor: "#aaa3a3" }}
              value={exp}
              name="exp"
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>

          <div className="container-text-center mb-2 mt-3">
            <h6>Select Required Skills:</h6>
          </div>
          <div className="my-3">
            <div className="form-check-text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value="JAVA"
                name="tech1"
                onChange={(e) => onInputChange(e)}
                checked={tech1 !== ""}
                id="flexCheckDefault1"
                style={{ marginLeft: "-1px" }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                JAVA
              </label>
            </div>
            <div className="form-check-text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value="SPRING BOOT"
                name="tech2"
                onChange={(e) => onInputChange(e)}
                checked={tech2 !== ""}
                id="flexCheckDefault2"
                style={{ marginLeft: "63px" }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                SPRING BOOT
              </label>
            </div>
            <div className="form-check-text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value="KOTLIN"
                name="tech3"
                onChange={(e) => onInputChange(e)}
                checked={tech3 !== ""}
                id="flexCheckDefault3"
                style={{ marginLeft: "16px" }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault3">
                KOTLIN
              </label>
            </div>
            <div className="form-check-text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value="JAVA SCRIPT"
                name="tech4"
                onChange={(e) => onInputChange(e)}
                checked={tech4 !== ""}
                id="flexCheckDefault4"
                style={{ marginLeft: "50px" }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault4">
                JAVA SCRIPT
              </label>
            </div>
            <div className="form-check-text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value="PYTHON"
                name="tech5"
                onChange={(e) => onInputChange(e)}
                checked={tech5 !== ""}
                id="flexCheckDefault5"
                style={{ marginLeft: "23px" }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault5">
                PYTHON
              </label>
            </div>
          </div>

          <div className="justify-content-between ">
            <button
              type="submit"
              className="btn btn-dark mb-3"
              onClick={cancel}
            >
              Cancel Post
            </button>
            <button
              type="submit"
              style={{ marginLeft: "100px" }}
              className="btn btn-dark mb-3"
            >
              Post Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addjobs;
