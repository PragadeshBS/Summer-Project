import image1 from "../../images/e1.png";
import "../eventDetail.css";
import EventAbstract from "./eventAbstract";
import EventInformation from "./eventInformation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loader/loading.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

const EventDetail = () => {
  const { user, token } = useAuthContext();
  const [isOrganiser, setIsOrganiser] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [registered, setRegistered] = useState(false);

  const register = () => {
    axios
      .post(
        `/api/events/participants/${data._id}`,
        {
          participantEmail: user,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setRegistered(true));
  };

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(`/api/events/${id}`).then((response) => {
        setData(response.data);
        response.data.organisers.forEach((organiser) => {
          if (organiser.email === user) {
            setIsOrganiser(true);
            return;
          }
        });
        response.data.participants.forEach((participant) => {
          if (participant.email == user) {
            setRegistered(true);
            return;
          }
        });
        setLoading(false);
      });
    };
    fetchDetail();
  }, [id, user]);

  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div className="row mt-5 mb-5">
          <div className="col d-flex justify-content-center">
            <img src={Loading} alt="..." />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div
        className="row mt-5 mb-5 pb-3"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
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
          event={data}
          isOrganiser={isOrganiser}
          user={user}
          registered={registered}
          register={register}
        />
        <hr />
        <EventInformation detail={data} />
        <hr />
      </div>
    </div>
  );
};

export default EventDetail;
