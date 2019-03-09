import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../game/Game";
import UserOverview from "../../login/UserOverview";
import Profile from "../../login/Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <UserOverview />}
                />
                <Route
                    exact
                    path={`${this.props.base}/:userId`}
                    component={Profile}
                    render={() => <Profile />}
                />
            </Container>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
