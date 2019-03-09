import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import {handleError} from "../../helpers/handleError";
import {catchError} from "../../helpers/catchError";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: white;
  text-transform: uppercase;
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 600px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 30px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  margin-bottom: 20px;
  text-align: left;
`;

const UserDetailsContainer = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  border: 1px solid #ffffff26;
`

const DataField = styled.div `
  &::value{
    color: white;
  }
  height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`

const UserIdContainer = styled.div `
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`

const UsernameContainer = styled.div`
  font-weight: bold;
  color: #06c4ff;
`

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            user_data: null
        };
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };

    componentDidMount() {
        const {userId} = this.props.match.params;
        fetch(`${getDomain()}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(returnedUser => {
                this.setState({user_data: returnedUser})
            })
            .catch(catchError) //implement proper exception handling if no data returned, @Julius: Was für Errors hast Du noch gehandelt?
    }

    render() {
        return (
            <Container>
                <h2>User Details</h2>
                {!this.state.user_data ? (
                    <Spinner />
                ) : (
                    <div>
                        <FormContainer>
                            <DetailsContainer>
                                <Label>User Id</Label>
                                <DataField>{this.state.user_data.id}</DataField>
                                <Label>Username</Label>
                                <DataField>
                                    {this.state.user_data.username}
                                </DataField>
                                <Label>Creation Date</Label>
                                <DataField>
                                    {this.state.user_data.creation_date}
                                </DataField>
                                <Label>Birthday</Label>
                                <DataField>
                                    Pending
                                </DataField>
                                <Label>Status</Label>
                                <DataField>
                                    {this.state.user_data.status}
                                </DataField>
                                <Button
                                    width={"50%"}
                                    margin-bottom={"10px"}
                                    onClick={() => {
                                        this.props.history.push("/users/"+this.state.user_data.id+"/edit")
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    width={"50%"}
                                    margin-bottom={"10px"}
                                    onClick={() => {
                                        this.props.history.push("/users")
                                    }}
                                >
                                    Back To Overview
                                </Button>
                            </DetailsContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                        </FormContainer>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Profile);
