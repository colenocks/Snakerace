import React, { Component } from "react";
import "./Signup.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupData: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ name, value }) {
    this.setState((prevState) => {
      let signupData = { ...prevState.signupData };
      signupData[name] = value;
      return { signupData };
    });
  }
  render() {
    const { signupHandler } = this.props;
    return (
      <div className='signup__form'>
        <form
          className=''
          onSubmit={(e) => signupHandler(e, this.state.signupData)}>
          <div className='form-group'>
            <input
              className='form-control'
              id='email'
              placeholder='Enter a valid email'
              type='email'
              name='email'
              defaultValue={this.state.signupData.email}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <input
              className='form-control'
              id='username'
              placeholder='Enter a username'
              type='text'
              name='username'
              defaultValue={this.state.signupData.username}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <input
              className='form-control'
              id='password'
              placeholder='Enter a password'
              name='password'
              type='password'
              defaultValue={this.state.signupData.password}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <input
              className='form-control'
              id='confirm_password'
              placeholder='Repeat password'
              name='confirm_password'
              type='password'
              defaultValue={this.state.signupData.confirm_password}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <button
              type='submit'
              id='signup'
              className='btn btn-primary btn-md w-100'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
