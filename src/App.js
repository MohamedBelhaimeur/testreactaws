import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import { getPostTrend, getallPost } from "./actions/post.actions";
import { getUser } from "./actions/user.actions";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = async () => {
      await axios({
        method: "get",
        url: backServerURL + `jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data.id);
        })
        .catch((err) => {
          console.log("No tokens");
        });
    };
    token();
    dispatch(getallPost());
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getPostTrend(uid));
    } // eslint-disable-next-line
  }, [uid]);
  
  useEffect(() => {
    var _paq = (window._paq = window._paq || []);
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    (function () {
      var u = "//f-server.viewdns.net/matomo/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", "1"]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
    // eslint-disable-next-lin
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
