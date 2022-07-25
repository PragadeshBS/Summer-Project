const EventAbstract = (props) => {
  return (
    <div className="row align-items-center">
      <div className="col-lg-6">
        <h1 className="display-6">
          {props.eventName}
          <small className="text-muted"> year</small>
        </h1>
        <h1 className="lead">Event timings</h1>
      </div>
      <div className="col-lg-6 d-grid gap-2">
        {/* <Link to="/"> */}
        <button type="button" className="btn btn-primary btn-lg">
          Register Now
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default EventAbstract;
