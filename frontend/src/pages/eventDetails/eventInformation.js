import { format } from "date-fns";

const EventInformation = (props) => {
  if (props.detail.link && !props.detail.link.startsWith("http://")) {
    props.detail.link = "https://" + props.detail.link;
  }
  return (
    <div>
      <h1>Event Info</h1>
      <h1 className="lead my-3">
        {format(new Date(props.detail.eventStartDate), "dd MMM yyyy\th:mm a")}
        {"\t"}-{"\t"}
        {format(new Date(props.detail.eventEndDate), "dd MMM yyyy\th:mm a")}
      </h1>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Venue</h5>
        </div>
        <div className="col-lg-10">
          <h6>{props.detail.venue}</h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Contact Name</h5>
        </div>
        <div className="col-lg-10">
          <h6>{props.detail.contactName}</h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Contact Number</h5>
        </div>
        <div className="col-lg-10">
          <h6>{props.detail.contactPhone}</h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Email</h5>
        </div>
        <div className="col-lg-10">
          <h6>{props.detail.contactEmail}</h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Link</h5>
        </div>
        <div className="col-lg-10">
          <h6>
            <a href={props.detail.link} target="_blank">
              {props.detail.link}
            </a>
          </h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Other Info</h5>
        </div>
        <div className="col-lg-10">
          <h6>{props.detail.otherInfo}</h6>
        </div>
      </div>
    </div>
  );
};

export default EventInformation;
