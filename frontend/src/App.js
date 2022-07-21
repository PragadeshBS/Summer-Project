import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import Home from "./pages/Home/Home";
import UserCreation from "./pages/UserCreationForm/UserCreation";
import Viewevents from "./pages/viewEvents/viewEvents";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails" element={<EventCreationForm />}></Route>
            <Route
              path="/eventcreationform"
              element={<EventCreationForm />}
            ></Route>
            <Route path="/signup" element={<UserCreation />}></Route>
            <Route path="/viewevents" element={<Viewevents />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
