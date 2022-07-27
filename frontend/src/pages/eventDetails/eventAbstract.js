import { useNavigate } from "react-router-dom";

const EventAbstract = ({ register, registered, user, event, isOrganiser }) => {
  const navigate = useNavigate();
  return (
    <div className="row align-items-center">
      <div className="col-lg-6">
        <h1 className="display-6">
          {event.eventName}
          <small className="text-muted"> year</small>
        </h1>
        <h1 className="lead">Event timings</h1>
      </div>
      <div className="col-lg-6 d-grid gap-2">
        {isOrganiser ? (
          <div>
            <button
              onClick={() => navigate(`/view-registrations/${event._id}`)}
              className="btn btn-success m-3"
            >
              View registrations
            </button>
            <button
              onClick={() => navigate(`/events/update/${event._id}`)}
              className="btn btn-secondary m-3"
            >
              Update event Info
            </button>
          </div>
        ) : user ? (
          registered ? (
            <span className="alert alert-success w-50 text-center mx-auto d-block">
              You have registered for this event
            </span>
          ) : (
            <button
              onClick={register}
              type="button"
              className="btn btn-primary btn-lg"
            >
              Register Now
            </button>
          )
        ) : (
          <span className="alert alert-secondary w-50 text-center mx-auto d-block">
            Login to register
          </span>
        )}
      </div>
    </div>
  );
};

export default EventAbstract;
