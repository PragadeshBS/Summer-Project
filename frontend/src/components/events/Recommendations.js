import { useEffect, useState } from "react";
import axios from "axios";
import image1 from "../../images/e1.png";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Recommendations = ({ eventId }) => {
  const [similarEvents, setSimilarEvents] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://ocr-backendmit.herokuapp.com/api/reccomended-events/${eventId}`
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
  };

  const handleClick = (url) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(url);
  };

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
                      new Date(event.eventStartDate),
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
