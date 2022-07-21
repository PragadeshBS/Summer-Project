import image1 from '../../images/e1.png'
import '../eventDetail.css'
import EventAbstract from './eventAbstract'
import EventInformation from './eventInformation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const EventDetail = () => {
    const { id } = useParams();
    console.log(id);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchDetail = () => {
            axios.get(`/api/events/${id}`).then((response) => {
                console.log(response.data);
                setData(response.data);
            });
        };
        fetchDetail();
    }, [id]);
    return <div className="container">
        <div>
            <section className="eventDetail">
                <img src={image1} className="img-fluid m-5 p-3 mx-auto d-block eventDetailImage" alt="..." />
            </section>
            <hr />
            <EventAbstract eventName={data.eventName} eventStart={data.eventStartDate} eventEnd={data.eventEndDate} />
            <hr />
            <EventInformation detail={data} />
            <hr />
        </div>
    </div>
}

export default EventDetail