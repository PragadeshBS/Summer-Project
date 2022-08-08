import { format } from "date-fns";
import { useState } from "react";

const EventInformation = (props) => {
  const [link, setLink] = useState(props.detail.link);
  if (link && !link.startsWith("http")) setLink("https://" + link);
  return (
    <div>
      <h1>Event Info</h1>
      <h1 className="lead my-3">
        {format(new Date(props.detail.eventStartDate), "dd MMM yyyy\th:mm a")}
        {"\t"}-{"\t"}
        {format(new Date(props.detail.eventEndDate), "dd MMM yyyy\th:mm a")}
      </h1>
      <div className="ps-5">
        <h5>Organisers</h5>
        <ul>
          {props.detail.organisers.map((org) => {
            return (
              <li key={org._id}>
                {org.userName} ({org.regNo})
              </li>
            );
          })}
        </ul>
      </div>

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
          <ReactWhatsapp number={props.detail.contactPhone} className="btn btn-success" message="get ready!">
          {props.detail.contactPhone}
            </ReactWhatsapp>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Email</h5>
        </div>
        <div className="col-lg-10">
          <h6>
            {props.detail.contactEmail}
            </h6>
        </div>
      </div>
      <div className="row ps-5">
        <div className="col-lg-2">
          <h5>Link</h5>
        </div>
        <div className="col-lg-10">
          <h6>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
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
