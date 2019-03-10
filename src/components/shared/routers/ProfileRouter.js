import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profile from "../../login/Profile";
import Profile_editing from "../../login/Profile_editing";

const Container = styled.div`
  flex-direction: column;
`;

class ProfileRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}`} //passing data from parent component to child component through props
                    component={Profile}
                    render={() => <Profile />}
                />
                <Route
                    exact
                    path={`${this.props.base}/edit`}
                    component={Profile}
                    render={() => <Profile_editing />}
                />
            </Container>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default ProfileRouter;
