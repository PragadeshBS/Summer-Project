import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventInformation from "../eventDetails/eventInformation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import RemoveParticipantsConfirmationModal from "../../../components/modals/RemoveParticipantsConfirmationModal";
import { Store } from "react-notifications-component";
import Loading from "../../loader/loading.svg";

const ViewRegistrations = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    axios.get("/api/events/" + id).then((res) => {
      setEvent(res.data);
      axios
        .get("/api/events/participants/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setParticipants(res.data);
        });
      setLoading(false);
    });
  }, [id, token]);

  const removeParticipants = () => {
    axios
      .delete("/api/events/all-participants/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Store.addNotification({
          title: "Success!",
          message: "Removed all participants",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
        setParticipants([]);
      });
  };

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
      <h1 className="display-3">Participants</h1>
      <h3>{event.eventName}</h3>
      <EventInformation detail={event} />
      {participants.length === 0 && (
        <div className="text-center my-3">
          <h6 className="display-6">No participants yet</h6>
        </div>
      )}
      {participants.length > 0 && (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Reg. no.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              {participants &&
                participants.map((p, idx) => {
                  return (
                    <tr key={p._id}>
                      <td>{idx + 1}</td>
                      <td>{p.regNo}</td>
                      <td>{p.userName}</td>
                      <td>{p.email}</td>
                      <td>{p.dept}</td>
                      <td></td>
                    </tr>
                  );
                })}
            </tbody>
            <tbody></tbody>
          </table>
          <div className="my-3 text-center">
            <button
              onClick={() => setShowRemoveModal(true)}
              className="btn btn-danger"
            >
              Remove all participants
            </button>
            <RemoveParticipantsConfirmationModal
              isOpen={showRemoveModal}
              close={() => setShowRemoveModal(false)}
              removeParticipants={removeParticipants}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewRegistrations;
