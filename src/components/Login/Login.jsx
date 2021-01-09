import React, { Component } from "react";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ name, value }) {
    this.setState((prevState) => {
      let loginData = { ...prevState.loginData };
      loginData[name] = value;
      return { loginData };
    });
  }

  render() {
    const { loginHandler } = this.props;
    return (
      <div className='login__form'>
        <form
          className=''
          onSubmit={(e) => loginHandler(e, this.state.loginData)}>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='Username or Email'
              type='text'
              name='username'
              defaultValue={this.state.loginData.username}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <input
              className='form-control'
              placeholder='Password'
              type='password'
              name='password'
              defaultValue={this.state.loginData.password}
              onChange={(e) => this.handleChange(e.target)}
              required
            />
            <button
              type='submit'
              id='login'
              className='btn btn-success btn-md w-100'>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
