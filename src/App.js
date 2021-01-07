import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import "./App.scss";
import { clientRequest } from "./AxiosConfig";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_logged_in: false,
      user_session: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
  }

  loginHandler(event, loginData) {
    console.log(loginData);
    event.preventDefault();
    clientRequest()
      .post("/login", loginData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Login Error: " + err);
        this.setState({
          is_logged_in: false,
        });
      });
  }

  signupHandler(event, signupData) {
    event.preventDefault();
    const { email, username, password, confirm_password } = signupData;

    clientRequest()
      .post("/signup", signupData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Signup Error: " + err);
        this.setState({
          is_logged_in: false,
        });
      });
  }

  render() {
    return (
      <section className='main__container'>
        <Header />
        <section className='main__content'>
          <Home
            loginHandler={this.loginHandler}
            signupHandler={this.signupHandler}
          />
        </section>
        <Footer />
      </section>
    );
  }
}

export default hot(module)(App);
