import image1 from "../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, compareAsc } from "date-fns";
import Loading from '../loader/loading.svg'

const Viewevents = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [filter, setFilter] = useState(detail);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get("/api/events").then((response) => {
        setDetail(response.data);
        setFilter(response.data)
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);
  const search = (e) => {
    if (e.target.value === "*") {
      setFilter(detail);
    } else {
      console.log(e.target.value);
      setFilter(
        detail.filter((x) => {
          return x.dept === e.target.value;
        })
      );
    }
  };
  if (loading) {
    return <div className="container d-block mx-auto">
      <h1 className="display-5 mt-5">Events</h1>
      <div className="row mt-5 mb-5">
        <div className="col d-flex justify-content-center">
          <img src={Loading} style={{ backgroundColor: "white" }} className="img-fluid" alt="..." />
        </div>
      </div>
    </div>
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <h1 className="display-5 mt-5">Events</h1>
        </div>
        <div className="col-7">
          {/*search bar*/}
        </div>
        <div className="col-3">
          <div className="btn-group mt-5">
            <select className="" style={{ height: "55%", width: "100%", marginTop: "6px" }} onClick={search}>
              <option className="dropdown-item" value="*" style={{ color: "red" }}>All</option>
              <option className="dropdown-item" value="IT">Information Technology</option>
              <option className="dropdown-item" value="EEE">Electrical and Electronic Engineering</option>
              <option className="dropdown-item" value="ECE">Electrical and Communication Engineering</option>
              <option className="dropdown-item" value="AE">Aeronotical Engineering</option>
              <option className="dropdown-item" value="AM">Automobile Engineering</option>
              <option className="dropdown-item" value="PT">Production Technology</option>
              <option className="dropdown-item" value="CT">Computer Science Engineering</option>
            </select>
          </div>
        </div>
      </div>
      <div
        className="row mt-5 mb-5"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        {filter.map((item) => {
          return (
            <div
              key={item._id}

              className="card m-5 p-1 col-1 mx-auto"
              style={{ width: "18rem" }}
            >
              <img
                src={item.image ? `/api/events/image/${item._id}` : image1}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{item.eventName}</h5>
                <p className="card-text">
                  {format(new Date(item.eventStartDate), "dd MMM yyyy-h:mm a")}
                </p>
                <Link to={`/eventdetails/${item._id}`}>
                  <span className="btn btn-primary">View Details</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Viewevents;
