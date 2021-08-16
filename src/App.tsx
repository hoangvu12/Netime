import React from "react";
import { matchRoutes, Route, Routes, useLocation } from "react-router";
import Footer from "./Footer";
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

      <div className="min-h-screen">
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} element={<Component />} path={path} />
          ))}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
