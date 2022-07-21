import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import EventDetail from "./pages/eventDetails/eventDetails";
import Home from "./pages/Home/Home";
import Viewevents from "./pages/viewEvents/viewEvents";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails/:id" element={<EventDetail />}></Route>
            <Route
              path="/eventcreationform"
              element={<EventCreationForm />}
            ></Route>
            <Route path="/viewevents" element={<Viewevents />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
