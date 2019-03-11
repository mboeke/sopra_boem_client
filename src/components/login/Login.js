import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import {NewButton} from "../../views/design/Button";
import {handleError} from "../../helpers/handleError";
import {catchError} from "../../helpers/catchError";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 400px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  color: white;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top:10px;
`

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      password: null,
      username: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
   */
  login() {
    fetch(`${getDomain()}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
        .then(handleError)
        .then(response => response.json())
        .then(returnedUser => {
          const user = new User(returnedUser);
          // store the token and decoded user_id into the local storage
          localStorage.setItem("token", user.token);
          var decoded_token = JSON.parse(atob(returnedUser.token));
          localStorage.setItem("user_id", decoded_token.user_id);

          // user login successfully worked --> navigate to the route /users/ in the UsersRouter
          this.props.history.push(`/users/`);
        })
        .catch(catchError);
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
    console.log("New username: "+this.state.username);
    console.log("New birthday: "+this.state.password);
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
        <BaseContainer>
          <FormContainer>
            <Form>
              <h2>Login</h2>
              <Label>Username</Label>
              <InputField
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("username", e.target.value);
                  }}
              />
              <Label>Password</Label>
              <InputField
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("password", e.target.value);
                  }}
              />
              <ButtonContainer>
                <Button
                    disabled={!this.state.username || !this.state.password}
                    width="50%"
                    onClick={() => {
                      this.login();
                    }}
                >
                  Login
                </Button>
              </ButtonContainer>
              <RegisterButtonContainer>
                <NewButton width="50%" onClick={() => {this.props.history.push("/register")}}>
                  New to Santorini?
                </NewButton>
              </RegisterButtonContainer>
            </Form>
          </FormContainer>
        </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
