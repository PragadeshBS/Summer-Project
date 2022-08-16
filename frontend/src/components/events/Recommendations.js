import { useEffect, useState } from "react";
import axios from "axios";
import image1 from "../../images/e1.png";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/loader/loading.svg";

const Recommendations = ({ eventId }) => {
  const [loading, setLoading] = useState(true);
  const [similarEvents, setSimilarEvents] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://ocr-backendmit.herokuapp.com/api/recommended-events/${eventId}`
      )
      .then((res) => {
        fetchEventDetails(res.data.similarEvents);
      });
  }, [eventId]);

  const navigate = useNavigate();

  const fetchEventDetails = async (eventIds) => {
    const promises = [];
    let temp = [];
    eventIds.forEach(async (event) => {
      let req = axios
        .get(`/api/events/${event}`)
        .then((res) => temp.push(res.data));
      promises.push(req);
    });
    await Promise.all(promises);
    setSimilarEvents(temp);
    setLoading(false);
  };

  const handleClick = (url) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(url);
  };

  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <div className="row mt-4">
          <div className="col">
            <h1 className="display-6">Getting recommendations...</h1>
          </div>
        </div>
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
    <div
      className="p-3 mb-3 rounded"
      style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
    >
      <h6 className="display-6 ms-3">You might also like</h6>
      <div className="row">
        {similarEvents &&
          similarEvents.map((event) => {
            return (
              <div
                key={event._id}
                className="mx-auto card my-2"
                style={{ width: "18rem", cursor: "pointer" }}
                onClick={() => handleClick(`/eventdetails/${event._id}`)}
              >
                <img
                  src={event.image ? `/api/events/image/${event._id}` : image1}
                  className="card-img-top d-block mt-1"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{event.eventName}</h5>
                  <p className="card-text">
                    {event.venue},{" "}
                    {format(
                      new Date(event.eventStartDate.substr(0, 16)),
                      "dd MMM yyyy\th:mm a"
                    )}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Recommendations;
