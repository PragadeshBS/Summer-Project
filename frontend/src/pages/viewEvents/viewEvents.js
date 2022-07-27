import image1 from "../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../loader/loading.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import Highlighter from "react-highlight-words";
import "./viewEvents.css";

const Viewevents = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { token } = useAuthContext();
  const [filteredDetail, setFilteredDetail] = useState(detail);
  const [Search, setSearch] = useState("*");
  useEffect(() => {
    const fetchDetail = () => {
      axios
        .get("/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setDetail(response.data);
          setFilteredDetail(response.data);
          setLoading(false);
        });
    };
    fetchDetail();
  }, [token]);
  const search = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 0) {
      setSearch("*");
    } else {
      setSearch(e.target.value);
    }
    setFilteredDetail(
      detail.filter((x) => {
        console.log(x.eventName);
        return (
          Search === "*" || x.eventName.toLowerCase().includes(e.target.value)
        );
      })
    );
  };
  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div className="row mt-5 mb-5">
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
      <h1 className="display-5 mt-5">Events</h1>
      <input
        type="text"
        id="myInput"
        onChange={search}
        placeholder="Search for names.."
        title="Type in a name"
      />
      <div
        className="row mt-5 mb-5"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        {filteredDetail.map((item) => {
          return (
            <div
              key={item._id}
              className="card m-5 p-1 col-1 mx-auto"
              style={{ width: "18rem" }}
            >
              <img
                src={item.image ? `/api/events/image/${item._id}` : image1}
                className="card-img-top"
                style={{ maxHeight: "200px" }}
                alt="..."
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
