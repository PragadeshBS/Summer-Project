import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCreationForm from "./pages/EventCreationForm/EventCreationForm";
import Home from "./pages/Home/Home";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
