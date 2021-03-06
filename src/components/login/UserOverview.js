import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayerButtonContainer = styled.li`/*adjust element styling when hovering over it:  onMouseEnter={() => {this.props.}}*/
  display: flex;

`


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    componentDidMount() {
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("token").toString(),
            }
        })
            .then(response => response.json())
            .then(async users => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({ users });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                <h2>User Overview</h2>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerButtonContainer>
                                        <PlayerContainer key={user.id} width="100%" onClick={() =>
                                            this.props.history.push("/users/"+user.id)}>
                                            <Player user={user} />
                                        </PlayerContainer>
                                    </PlayerButtonContainer>
                                );
                            })}
                        </Users>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Game);
