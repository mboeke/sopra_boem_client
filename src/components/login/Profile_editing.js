import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { UserDetailButton } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import {handleError} from "../../helpers/handleError";
import {catchError} from "../../helpers/catchError";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  margin-bottom: 100px;
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

const ButtonContainer = styled.div `
  width: 280px;
  position: absolute;
  bottom: 0;
  align-items: center;
`

//check again if user has editing rights with "check_authorized_for_editing()" if user may try to open url directly: "domain/users/id/edit"
//only let user edit the username, birthday and password
//highlight those that are editable with different color than those which are not

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
                                    {this.state.user_data.birthday_date}
                                </DataField>
                                <Label>Status</Label>
                                <DataField>
                                    {this.state.user_data.status}
                                </DataField>
                            </DetailsContainer>
                            <ButtonContainer>
                                <UserDetailButton
                                    onClick={() => {
                                        this.props.history.push("/users/"+this.state.user_data.id+"/edit")
                                    }}
                                >
                                    Edit
                                </UserDetailButton>
                                <UserDetailButton
                                    onClick={() => {
                                        this.props.history.push("/users")
                                    }}
                                >
                                    Back To Overview
                                </UserDetailButton>
                            </ButtonContainer>
                            <Button
                                width={"280px"}
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
