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
            <Route
              path="/eventdetails/:id"
              element={!user ? <Navigate to="/login" /> : <EventDetail />}
            />
            <Route
              path="/events/update/:id"
              element={!user ? <Navigate to="/login" /> : <UpdateEvent />}
            />
            <Route
              path="/eventcreationform"
              element={!user ? <Navigate to="/login" /> : <EventCreationForm />}
            />
            <Route path="/eventcreationform" element={<EventCreationForm />} />
            <Route
              path="/viewevents"
              element={!user ? <Navigate to="/login" /> : <Viewevents />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
