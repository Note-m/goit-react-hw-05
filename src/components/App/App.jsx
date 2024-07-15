// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>HOme</div>} />
        <Route />
        <Route />
      </Routes>
    </div>
  );
};
export default App;
