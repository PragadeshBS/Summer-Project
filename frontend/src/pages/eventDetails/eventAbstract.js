import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnregisterConfirmationModal from "../../components/UnregisterConfirmationModal";
import {Rating} from 'react-simple-star-rating';

const EventAbstract = ({
  register,
  registered,
  user,
  event,
  isOrganiser,
  unregister,
  regLoading,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rating,setRating]=useState(0);
  const navigate = useNavigate();

  const handlerating=(rate)=>
  {
    setRating(rate);
  }
  return (
    <div className="align-items-center">
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
        new Date(event.eventEndDate) < new Date() ? (
          <div className="alert alert-secondary text-center">
            <Rating
              onClick={handlerating}
              ratingValue={rating}
              size={20}
              label 
              transition
              fillColor='orange'
              emptyColor='gray'
              className="foo"
              />
          </div>
        ) : regLoading ? (
          <div className="alert mx-auto alert-secondary text-center">
            Making changes...
          </div>
        ) : registered ? (
          <div>
            <div className="alert mx-auto alert-success text-center">
              You have registered for this event!
            </div>
            <div className="text-danger mx-auto text-center cursor-pointer">
              <span
                onClick={() => setShowConfirmationModal(true)}
                style={{ cursor: "pointer" }}
              >
                Unregister
              </span>
            </div>
          </div>
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
      <UnregisterConfirmationModal
        isOpen={showConfirmationModal}
        close={() => setShowConfirmationModal(false)}
        unregister={unregister}
      />
    </div>
  );
};

export default EventAbstract;
