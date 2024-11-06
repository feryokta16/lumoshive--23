import React from "react";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/posts/:id" element={<BlogDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
