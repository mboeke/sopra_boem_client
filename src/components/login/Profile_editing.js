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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const DataField = styled.div `
  height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.2);
`

const InputDataField = styled.input`
&::placeholder{
  color: rgba(255, 255, 255, 0.3);
}
  height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  margin-left: -4px;
  border: 1px solid rgb(255, 255, 26);
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
    // validate user input, required fields cannot be empty show alert that fields with "*" have to be provided, if any field is missing or set to null although requiring value

/*
    <InputField
placeholder="Enter here.."
onChange={e => {
    this.handleInputChange("username", e.target.value);
}}
/>
*/


class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            user_data: null,
            id: null,
            username: null,
            birthday_date: null,
        };
        this.baseState = this.state;
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
        console.log("New username: "+this.state.username);
        console.log("New birthday: "+this.state.birthday_date);
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

    update_user_data(){
        const {userId} = this.props.match.params;
        fetch(`${getDomain()}/users/${userId}/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.user_data.id,
                username: this.state.username,
                birthday_date: this.state.birthday_date,

            })
        })
            .then(handleError)
            .then(response => response.json())
            .then(successful => {
                if(successful){
                    //redirect user to user profile
                    this.props.history.push("/users/"+this.state.user_data.id)
                }else{
                    throw new Error("Database could not be updated")
                }
            }
                //confirm user data has been saved, wait on confirmation page to redirect user to "users/id"
                //this.props.history.push(`/users/data_saved`)
            )
            .catch(catchError)
    }

    render() {
        return (
            <Container>
                <h2>Editing your User Details</h2>
                {!this.state.user_data ? (
                    <Spinner />
                ) : (
                    <FormContainer>
                        <DetailsContainer>
                            <Label>User Id*</Label>
                            <DataField
                                onClick={() => alert("This field cannot be modified")}
                            >
                                {this.state.user_data.id}
                            </DataField>
                            <Label>Username</Label>
                            <InputDataField
                                placeholder={this.state.user_data.username}
                                //placeholder={"Enter your new username here"}
                                //value={this.state.user_data.username}
                                onClick={()=>{this.setState({username: ""})}}
                                onChange={e => this.handleInputChange("username", e.target.value)}
                            >
                            </InputDataField>
                            <Label>Creation Date*</Label>
                            <DataField
                                onClick={() => alert("This field cannot be modified")}
                            >
                                {this.state.user_data.creation_date}
                            </DataField>
                            <Label/*add info hover for correct input format*/>Birthday</Label>
                            <InputDataField
                                placeholder={this.state.user_data.birthday_date}
                                //value={this.state.user_data.birthday_date}
                                onClick={()=>{this.setState({birthday_date: ""})}}
                                onChange={e => this.handleInputChange("birthday_date", e.target.value)}
                            >
                            </InputDataField>
                            <Label>Status*</Label>
                            <DataField
                                onClick={() => alert("This field cannot be modified")}
                            >
                                {this.state.user_data.status}
                            </DataField>
                        </DetailsContainer>
                        <ButtonContainer>
                            <UserDetailButton
                                disabled={!this.state.username && !this.state.birthday_date}
                                onClick={() => {
                                    this.update_user_data();
                                }}
                            >
                                Save
                            </UserDetailButton>
                        </ButtonContainer>
                        <Button
                            width={"280px"}
                            onClick={() => {
                                //if changes detected prevent user from moving away from editing page
                                if(!this.state.username || !this.state.username){
                                    this.logout();
                                }else{
                                    alert("Please save your adjusted user details or remove them to logout")
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </FormContainer>
                )}
            </Container>
        );
    }
}

export default withRouter(Profile);
