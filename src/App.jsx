import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BucketList from "./pages/BucketList";
import Post from "./pages/Post";
import AuthContext from "./context/authContext";

import AddPost from "./pages/AddPost";
import UpdatePost from "./pages/UpdatePost";
import Confirm from "./pages/Confirm";
import NotFoundPage from "./components/NotFoundPage";

import "./App.css";

function App() {
  const [user, setUser] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isUserLoggedIn, setIsUserLoggedIn }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/bucket-list' component={BucketList} />
          <Route path='/add-post' component={AddPost} />
          <Route path='/post/:postId' component={Post} />
          <Route path='/updatepost/:postId' component={UpdatePost} />
          <Route path='/confirm/:confirmationCode' component={Confirm} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
