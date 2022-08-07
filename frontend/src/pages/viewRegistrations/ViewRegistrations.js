import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventInformation from "../eventDetails/eventInformation";
import { format } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";
import RemoveParticipantsConfirmationModal from "../../components/RemoveParticipantsConfirmationModal";

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
    // 
    setParticipants([])
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="display-3">Participants</h1>
      <p className="text-muted">
        {format(new Date(event.eventStartDate), "dd MMM yyyy-h:mm a")}
      </p>
      <h3>{event.eventName}</h3>
      <EventInformation detail={event} />
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {participants &&
              participants.map((p, idx) => {
                return (
                  <tr key={p._id}>
                    <td>{idx + 1}</td>
                    <td>{p.userName}</td>
                    <td>{p.email}</td>
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
    </div>
  );
};
export default ViewRegistrations;
