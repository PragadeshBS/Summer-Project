import image1 from "../../images/e1.png";
import "../eventDetail.css";
import EventAbstract from "./eventAbstract";
import EventInformation from "./eventInformation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const EventDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get(`/api/events/${id}`).then((response) => {
        setData(response.data);
      });
    };
    fetchDetail();
  }, [id]);
  return (
    <div className="container">
      <div>
        <section className="eventDetail">
          <img
            src={data.image ? `/api/events/image/${data._id}` : image1}
            className="img-fluid my-3 rounded mx-auto d-block eventDetailImage"
            alt="..."
            style={{ maxWidth: "500px" }}
          />
        </section>
        <hr />
        <EventAbstract
          eventName={data.eventName}
          eventStart={data.eventStartDate}
          eventEnd={data.eventEndDate}
        />
        <hr />
        <EventInformation detail={data} />
        <hr />
      </div>
    </div>
  );
};

export default EventDetail;
