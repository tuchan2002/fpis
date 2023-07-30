import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/login";
import { useEffect } from "react";
import PrivateRouter from "./customRouter/PrivateRouter";
import GlobalAlert from "./components/shared/GlobalAlert";
import Home from "./components/shared/Home";
import { getAuth } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  return (
    <Router>
      <GlobalAlert />
      <Routes>
        <Route path="/" element={auth.token ? <Home /> : <Login />} />
        <Route
          path="/:page"
          element={
            <PrivateRouter>
              <PageRender />
            </PrivateRouter>
          }
        />
        <Route
          path="/:page/:id"
          element={
            <PrivateRouter>
              <PageRender />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
