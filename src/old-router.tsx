import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./layouts";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import MyDopples from "./pages/MyDopples";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import TopCharts from "./pages/TopCharts";
import Category from "./pages/Category";
import Messages from "./pages/Messages";
import Community from "./pages/Community";
import Account from "./pages/Account";

const App = () => {
  const profile = useSelector(store => store.AuthReducer.profile);

  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/:key" element={<Explore />} />
          <Route path="/topcharts" element={<TopCharts />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/account"
            element={profile ? <Account /> : <Error404 />}
          />
          <Route path="/messages" element={<Messages />} />
          <Route path="/category/:key" element={<Category />} />
          <Route path="/profile/:key" element={<Profile />} />
          <Route
            path="/settings"
            element={
              profile && profile.type === 2 ? <Settings /> : <Error404 />
            }
          />
          <Route
            path="/mydopples"
            element={profile ? <MyDopples /> : <Error404 />}
          />
          <Route path="/error" element={<Error404 />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
