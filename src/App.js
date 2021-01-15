import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Arena from "./components/Arena/Arena";
import EnterGame from "./components/EnterGame/EnterGame";
import { clientRequest, getBaseURL } from "./AxiosConfig";
import socketIOClient from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_logged_in: false,
      user_session: null,
      username: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    const is_logged_in = localStorage.getItem("is_logged_in");
    const user_session = localStorage.getItem("user_session");
    const username = localStorage.getItem("username");

    if (is_logged_in || user_session) {
      this.setState({
        is_logged_in,
        user_session,
        username,
      });
    }
  }

  loginHandler(event, loginData) {
    event.preventDefault();
    clientRequest()
      .post("/login", loginData)
      .then((res) => {
        toast("Login successful", {
          type: "success",
        });
        localStorage.setItem("is_logged_in", true);
        localStorage.setItem("user_session", res.data.user_session);
        localStorage.setItem("username", res.data.username);
        this.setState(
          {
            is_logged_in: true,
            user_session: res.data.user_session,
            username: res.data.username,
          },
          () => this.props.history.push("/entergame")
        );
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

  logoutHandler() {
    const url = getBaseURL();
    const socket = socketIOClient(url);

    clientRequest()
      .get("/logout")
      .then((res) => {
        console.log(res);
        toast(res.data.message, { type: "dark" });
        this.setState({
          user_session: null,
          is_logged_in: false,
        });
        localStorage.clear();
        socket.disconnect();
        this.props.history.push("/");
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
        <ToastContainer hideProgressBar newestOnTop />
        <Header
          user_session={this.state.user_session}
          logoutHandler={this.logoutHandler}
        />
        <section className='main__content'>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Home
                  loginHandler={this.loginHandler}
                  signupHandler={this.signupHandler}
                />
              )}
            />
            <Route
              exact
              path='/arena'
              render={(props) => (
                <Arena
                  {...props}
                  user_session={this.state.user_session}
                  username={this.state.username}
                />
              )}
            />
            <Route
              exact
              path='/entergame'
              render={(props) => (
                <EnterGame
                  {...props}
                  user_session={this.state.user_session}
                  username={this.state.username}
                />
              )}
            />
          </Switch>
        </section>
        <Footer />
      </section>
    );
  }
}

export default hot(module)(withRouter(App));
