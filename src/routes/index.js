import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AddEmployer from '../pages/AddEmployer';
import ViewEmployer from '../pages/ViewEmployer';
import UpdateEmployer from '../pages/UpdateEmployer';

const App = () => {
  return (
    <>
      <React.Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-employers" element={<AddEmployer />} />
          <Route path="/view-employers" element={<ViewEmployer />} />
          <Route path="/employer/:id" element={<UpdateEmployer />} />
        </Routes>
      </React.Suspense>
    </>
  );
};

export default App;
