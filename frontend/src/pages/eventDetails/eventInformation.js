const EventInformation = (props) => {
    return <div>
        <h1>Event Info</h1>
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
                <h5>Description</h5>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.otherInfo}</h6>
            </div>
        </div>
    </div>
}

export default EventInformation