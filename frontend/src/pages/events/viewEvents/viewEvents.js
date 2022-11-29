import image1 from "../../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../../loader/loading.svg";
import Pagination from "./Pagination";

import Highlighter from "react-highlight-words";
import "./viewEvents.css";

const Viewevents = ({ category }) => {
  let fetchUrl;
  switch (category) {
    case "ARCHIVES":
      fetchUrl = "/api/events/archives";
      break;
    case "UPCOMING":
      fetchUrl = "/api/events/upcoming-events";
      break;
    default:
      fetchUrl = "/api/events/upcoming-events";
  }
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [filter, setFilterDetail] = useState(detail);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get(fetchUrl).then((response) => {
        response.data.forEach((event) => {
          event.imageLoading = true;
        });
        setDetail(response.data);
        setFilterDetail(response.data);
        setLoading(false);
      });
    };
    fetchDetail();
  }, [fetchUrl]);
  const searchdept = (e) => {
    if (e.target.value === "*") {
      setFilterDetail(detail);
    } else {
      setFilterDetail(
        detail.filter((x) => {
          return x.dept === e.target.value;
        })
      );
    }
  };
  const [Search, setSearch] = useState("*");
  const search = (e) => {
    if (e.target.value.length === 0) {
      setSearch("*");
    } else {
      setSearch(e.target.value);
    }
    setFilterDetail(
      detail.filter((x) => {
        return (
          Search === "*" || x.eventName.toLowerCase().includes(e.target.value)
        );
      })
    );
  };

  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <div className="row">
          <div className="col">
            <h1 className="display-3">Events</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col d-flex justify-content-center">
            <img
              src={Loading}
              style={{ backgroundColor: "white" }}
              className="img-fluid"
              alt="..."
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-2">
          <h1 className="display-3">
            {category === "UPCOMING" ? "Upcoming Events" : "Event Archives"}
          </h1>
        </div>
        <div className="col-4"></div>
        <div className="col-lg-3">
          <input
            style={{ width: "100%", height: "75%" }}
            className="form-control"
            type="text"
            id="myInput"
            onChange={search}
            placeholder="Search for events.."
            title="Type in a event"
          />
        </div>
        <div className="col-lg-3">
          <select
            className="form-select mb-2"
            style={{ width: "100%", marginTop: "6px" }}
            onChange={searchdept}
          >
            <option className="" value="*">
              All
            </option>
            <option value="AM">Automobile Engineering</option>
            <option value="CT">Computer Science Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="EEE">Electrical and Electronics Engineering</option>
            <option value="ECE">
              Electronics and Communication Engineering
            </option>
            <option value="IE">Instrumentation Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="PT">Production Technology</option>
            <option value="OTH">Others</option>
          </select>
        </div>
      </div>
      {filter.length === 0 && (
        <div className="display-6 text-center my-5">
          No events found, check back later or try a different filter
        </div>
      )}
      <div className="row">
        {filter.map((item) => {
          return (
            <div
              key={item._id}
              className="card m-5 p-1 col-1 mx-auto pop-out-card with-transform animateText"
              style={{ width: "18rem" }}
            >
              <img
                src={item.image ? `/api/events/image/${item._id}` : image1}
                className={`card-img-top ${
                  item.imageLoading ? "hide" : "view"
                }`}
                style={{
                  maxHeight: "200px",
                }}
                alt="..."
                onLoad={() => {
                  let temp = filter.map((event) => {
                    if (event._id === item._id) {
                      event.imageLoading = false;
                    }
                    return event;
                  });
                  setFilterDetail(temp);
                }}
              />
              <img
                src={Loading}
                alt="..."
                className={`mx-auto  ${item.imageLoading ? "view" : "hide"}`}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[Search]}
                    autoEscape={true}
                    textToHighlight={item.eventName}
                  />
                </h5>
                <p className="card-text">
                  {format(
                    new Date(item.eventStartDate.substr(0, 16)),
                    "dd MMM yyyy-h:mm a"
                  )}
                </p>
                <Link to={`/eventdetails/${item._id}`}>
                  <span className="btn btn-primary">View Details</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row pb-5">
        <Pagination
          data={detail}
          setVisibleData={setFilterDetail}
          page={category}
        />
      </div>
    </div>
  );
};

export default Viewevents;
