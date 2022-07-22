import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import EventDetail from "./pages/eventDetails/eventDetails";
import Home from "./pages/Home/Home";
import Viewevents from "./pages/viewEvents/viewEvents";
import Navbar from "./components/Navbar";
import Signup from "./pages/signup/Signup";
import UpdateEvent from "./pages/EventUpdateForm/EventUpdateForm";
import Login from "./pages/login/Login";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails/:id" element={<EventDetail />} />
            <Route path="/events/update/:id" element={<UpdateEvent />} />
            <Route path="/eventcreationform" element={<EventCreationForm />} />
            <Route path="/viewevents" element={<Viewevents />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
