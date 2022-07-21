import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import EventUpdateForm from "./pages/EventUpdateForm/EventUpdateForm";
import Home from "./pages/Home/Home";
import UserCreation from "./pages/UserCreationForm/UserCreation";
import Viewevents from "./pages/viewEvents/viewEvents";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails" element={<EventCreationForm />} />
            <Route path="/eventcreationform" element={<EventCreationForm />} />
            <Route path="/event/update/:id" element={<EventUpdateForm />} />
            <Route path="/signup" element={<UserCreation />} />
            <Route path="/viewevents" element={<Viewevents />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
