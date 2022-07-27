import { format } from "date-fns";

const EventAbstract = (props) => {
  return (
    <div className="row align-items-center">
      <div className="col-lg-6">
        <h1 className="display-6">
          {props.eventName}
          <br />
          <small className="text-muted">{props.dept}</small>
        </h1>
        <h1 className="lead">
          {format(new Date(props.eventStart), "dd MMM yyyy\th:mm a")}
          {'\t'}-{'\t'}
          {format(new Date(props.eventEnd), "dd MMM yyyy\th:mm a")}
        </h1>
      </div>
      <div className="col-lg-6 d-grid gap-2">
        {/* <Link to="/"> */}
        <button type="button" className="btn btn-primary btn-lg">
          Register Now
        </button>
        {/* </Link> */}
      </div>
    </div >
  );
};

export default EventAbstract;
