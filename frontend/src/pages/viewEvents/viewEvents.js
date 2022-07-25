import image1 from "../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, compareAsc } from "date-fns";
import Loading from "../loader/loading.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

const Viewevents = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const fetchDetail = () => {
      axios
        .get("/api/events", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          setDetail(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Not autorised");
        });
    };
    fetchDetail();
  }, []);
  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div
          className="row mt-5 mb-5"
          style={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <div className="col d-flex justify-content-center">
            <img src={Loading} alt="..." />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="display-5 mt-5">Events</h1>
      <div
        className="row mt-5 mb-5"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        {detail.map((item) => {
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
