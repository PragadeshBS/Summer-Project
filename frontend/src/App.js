import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { useAuthContext } from "./hooks/useAuthContext";

import EventCreationForm from "./pages/events/createEvent/EventCreationForm";
import EventDetail from "./pages/events/eventDetails/eventDetails";
import Viewevents from "./pages/events/viewEvents/viewEvents";
import UpdateEvent from "./pages/events/updateEvent/EventUpdateForm";
import ViewRegistrations from "./pages/events/viewRegistrations/ViewRegistrations";

import Navbar from "./components/navbar/Navbar";

import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";

import Profile from "./pages/user/profile/Profile";
import OrganisedEvents from "./pages/user/organisedEvents/OrganisedEvents";
import ParticipatedEvents from "./pages/user/participatedEvents/ParticipatedEvents";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <ReactNotifications />
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Viewevents category="UPCOMING" />} />
            <Route path="/eventdetails/:id" element={<EventDetail />} />
            <Route
              path="/events/update/:id"
              element={!user ? <Navigate to="/login" /> : <UpdateEvent />}
            />
            <Route
              path="/eventcreationform"
              element={
                !user ? (
                  <Navigate to="/login?flow=eventcreationform" />
                ) : (
                  <EventCreationForm />
                )
              }
            />
            <Route
              path="/upcoming-events"
              element={<Viewevents category="UPCOMING" />}
            />
            <Route
              path="/archives"
              element={<Viewevents category="ARCHIVES" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={!user ? <Navigate to="/login" /> : <Profile />}
            />
            <Route
              path="view-registrations/:id"
              element={user ? <ViewRegistrations /> : <Navigate to="/login" />}
            />
            <Route
              path="organised-events"
              element={user ? <OrganisedEvents /> : <Navigate to="/login" />}
            />
            <Route
              path="participated-events"
              element={user ? <ParticipatedEvents /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
