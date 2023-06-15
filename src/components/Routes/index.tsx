import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Info from '../Info';
import Form from '../Form';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Info />}></Route>
      <Route path="/create" element={<Form />}></Route>
      <Route path="/*" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default AppRoutes;
