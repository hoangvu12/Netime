import React from "react";
import { matchRoutes, Route, Routes, useLocation } from "react-router";
import Header from "./Header";
import routes from "./routes";

const routeObj = routes.map(({ component: Component, path }) => ({
  caseSensitive: false,
  element: <Component />,
  path,
}));

function App() {
  const location = useLocation();

  const matchedRoute = matchRoutes(routeObj, location)?.[0];

  return (
    <div className="App">
      <Header matchedRoute={matchedRoute} />

      <div className="px-8 py-20 lg:px-20 lg:py-24">
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} element={<Component />} path={path} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
