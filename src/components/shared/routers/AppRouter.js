import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import { RegisterGuard } from "../routeProtectors/RegisterGuard";
import Register from "../../login/Register";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import UsersRouter from "./UsersRouter";
import Profile from "../../login/Profile";
import { UsersGuard } from "../routeProtectors/UsersGuard";
import ProfileRouter from "./ProfileRouter";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
                path="/register"
                exact render={() => ( //What is the arrow function for?, /** Why "<Register />", double check in React notes & documentation ? --> probably the reference to the function within RegisterGuard, not? */
                <RegisterGuard>
                    <Register />
                </RegisterGuard>
            )}
            />
            <Route
                path="/users/"
                exact render={() => (
                <UsersGuard>
                    <UsersRouter base={"/users/"}/>
                </UsersGuard>
            )}
            />
            <Route
                path="/users/:userId"
                exact render={() => (
                <ProfileGuard>
                    <ProfileRouter base={"/users/:userId"} />
                </ProfileGuard>
            )}
            />
            <Route
                path="/users/:userId/edit"
                exact render={() => (
                <ProfileGuard>
                    <ProfileRouter base={"/users/:userId"} />
                </ProfileGuard>
            )}
            />
            <Route path="/" exact render={() => <Redirect to={"/login"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
