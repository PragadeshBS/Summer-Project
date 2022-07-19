import image1 from '../../images/e1.png'
import '../eventDetail.css'
import EventAbstract from './eventAbstract'
import EventInformation from './eventInformation'
const EventDetail = () => {
    return <div className="container">
        <section className="eventDetail">
            <img src={image1} class="img-fluid m-5 p-3 mx-auto d-block eventDetailImage" alt="..." />
        </section>
        <hr />
        <EventAbstract eventName={"Event Name"} />
        <hr />
        <EventInformation />
        <hr />
    </div>
}

export default EventDetail