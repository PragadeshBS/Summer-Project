import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import EventDetail from "./pages/eventDetails/eventDetails";
import Home from "./pages/Home/Home";
import Viewevents from "./pages/viewEvents/viewEvents";
import Navbar from "./components/Navbar";
import Signup from "./pages/signup/Signup";
import UpdateEvent from "./pages/EventUpdateForm/EventUpdateForm";
import Login from "./pages/login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/profile/Profile";
import ViewRegistrations from "./pages/viewRegistrations/ViewRegistrations";
import OrganisedEvents from "./pages/organisedEvents/OrganisedEvents";
import ParticipatedEvents from "./pages/Participated Events/ParticipatedEvents";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails/:id" element={<EventDetail />} />
            <Route
              path="/events/update/:id"
              element={!user ? <Navigate to="/login" /> : <UpdateEvent />}
            />
            <Route
              path="/eventcreationform"
              element={!user ? <Navigate to="/login" /> : <EventCreationForm />}
            />
            <Route path="/viewevents" element={<Viewevents />} />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
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
