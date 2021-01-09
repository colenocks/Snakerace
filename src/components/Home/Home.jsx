import React, { Component } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: true,
      toggleLabel: "Click to register",
      toggleText: "Don't have an account?",
      toggleColor: "btn-warning",
    };

    this.toggleForms = this.toggleForms.bind(this);
  }

  toggleForms() {
    let { showLoginForm, toggleText, toggleLabel, toggleColor } = this.state;
    if (showLoginForm) {
      showLoginForm = false;
      toggleLabel = "Login";
      toggleText = "Already signed up?";
      toggleColor = "btn-info";
    } else {
      showLoginForm = true;
      toggleLabel = "Click to register";
      toggleText = "Don't have an account?";
      toggleColor = "btn-warning";
    }
    this.setState({ showLoginForm, toggleText, toggleLabel, toggleColor });
  }

  render() {
    const { loginHandler, signupHandler } = this.props;
    return (
      <section className='home'>
        <h2 className='text-capitalize text-center text-success'>
          Welcome to the race portal
        </h2>
        <div className='forms container row justify-content-md-center'>
          <div className='col-12 col-lg-6'>
            <div className='card mb-5 bg-dark'>
              <div className='card-body'>
                <h5 className='card-title mb-4'>{this.state.toggleText}</h5>
                <button
                  className={`btn btn-md ${this.state.toggleColor} card-link`}
                  onClick={this.toggleForms}>
                  {this.state.toggleLabel}
                </button>
              </div>
            </div>
            {this.state.showLoginForm ? (
              <Login loginHandler={loginHandler} />
            ) : (
              <Signup signupHandler={signupHandler} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
