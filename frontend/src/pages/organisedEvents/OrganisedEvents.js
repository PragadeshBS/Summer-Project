import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import OrganizedEventsList from "./OrganizedEventsList";

const OrganisedEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { token } = useAuthContext();
  useEffect(() => {
    axios
      .get("/api/users/events-organised", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="display-3">Organised Events</h1>
      <p className="small text-muted">Events organised by you</p>
      {events.length ? (
        <OrganizedEventsList events={events} />
      ) : (
        <div style={{ position: "relative", height: "50vh" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
            }}
            className="display-6 text-center text-secondary"
          >
            Events that you organize appear here
          </div>
        </div>
      )}
    </div>
  );
};
export default OrganisedEvents;
