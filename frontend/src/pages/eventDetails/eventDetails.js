import image1 from "../../images/e1.png";
import "../eventDetail.css";
import EventAbstract from "./eventAbstract";
import EventInformation from "./eventInformation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loader/loading.svg"
const EventDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get(`/api/events/${id}`).then((response) => {
        setData(response.data);
        setLoading(false);
      });
    };
    fetchDetail();
  }, [id]);
  if (loading) {
    return <div className="container d-block mx-auto">
      <h1 className="display-5 mt-5">Events</h1>
      <div className="row mt-5 mb-5">
        <div className="col d-flex justify-content-center">
          <img src={Loading} alt="..." />
        </div>
      </div>
    </div>
  }
  return (
    <div className="container">
      <div className="row mt-5 mb-5 pb-3"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}>
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
