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
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/bucket-list' component={BucketList} />
        <Route exact path='/add-post' component={AddPost} />
        <Route path='*' component={NotFoundPage} />
        <Switch>
          <Route exact path='/post/:postId' component={Post} />
        </Switch>
        <Switch>
          <Route exact path='/updatepost/:postId' component={UpdatePost} />
        </Switch>
        <Switch>
          <Route exact path='/confirm/:confirmationCode' component={Confirm} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
