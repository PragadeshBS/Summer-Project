const EventInformation = (props) => {
    return <div>
        <h3>Event Info:</h3>
        <div className="row ps-5">
            <div className="col-lg-2">
                <h6>Venue</h6>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.venue}</h6>
            </div>
        </div>
        <div className="row ps-5">
            <div className="col-lg-2">
                <h6>Contact Name</h6>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.contactName}</h6>
            </div>
        </div>
        <div className="row ps-5">
            <div className="col-lg-2">
                <h6>Contact Number</h6>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.contactPhone}</h6>
            </div>
        </div>
        <div className="row ps-5">
            <div className="col-lg-2">
                <h6>Email</h6>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.contactEmail}</h6>
            </div>
        </div>
        <div className="row ps-5">
            <div className="col-lg-2">
                <h6>Description</h6>
            </div>
            <div className="col-lg-10">
                <h6>{props.detail.otherInfo}</h6>
            </div>
        </div>
    </div>
}

export default EventInformation