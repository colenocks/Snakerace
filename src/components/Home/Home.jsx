import React, { Component } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loginHandler, signupHandler } = this.props;
    return (
      <section className='home'>
        <h2 className='text-capitalize text-center'>
          Welcome to the snake race portal
        </h2>
        <div className='forms container row justify-content-md-center'>
          <Login loginHandler={loginHandler} />
          <Signup signupHandler={signupHandler} />
        </div>
      </section>
    );
  }
}

export default Home;
