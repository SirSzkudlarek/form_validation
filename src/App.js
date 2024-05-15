import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    pass: "",
    email: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      pass: false,
      email: false,
      accept: false,
    },
  };

  messages = {
    username_incorrect:
      "Your username must contain atleast six letters, space in not allowed!",
    password_incorrect: "Your password must contain atleast eight letters!",
    email_incorrect: "Email is missing '@'!",
    accept_incorrect: "You need to accept terms of use!",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: value,
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const valdation = this.formValidation();

    if (valdation.correct) {
      this.setState({
        username: "",
        pass: "",
        email: "",
        accept: false,
        message: "Formularz został wysłany",

        errors: {
          username: false,
          pass: false,
          email: false,
          accept: false,
        },
      });
      console.log("form was send");
    } else {
      this.setState({
        errors: {
          username: !valdation.username,
          pass: !valdation.password,
          email: !valdation.email,
          accept: !valdation.accept,
        },
      });
    }
  };

  formValidation = () => {
    let username = false;
    let password = false;
    let email = false;
    let accept = false;
    let correct = false;

    if (
      this.state.username.length >= 6 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }

    if (this.state.pass.length >= 8) {
      password = true;
    }

    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }

    if (this.state.accept) {
      accept = true;
    }

    if (username && password && email && accept) {
      correct = true;
    }

    return {
      correct,
      username,
      password,
      email,
      accept,
    };
  };

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: "",
          }),
        3000
      );
    }
  }
  render() {
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            Username:
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && (
              <p>{this.messages.username_incorrect}</p>
            )}
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
            {this.state.errors.pass && (
              <p>{this.messages.password_incorrect}</p>
            )}
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && <p>{this.messages.email_incorrect}</p>}
          </label>

          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            ></input>
            I accept terms of use.
            {this.state.errors.accept && (
              <p>{this.messages.accept_incorrect}</p>
            )}
          </label>

          <button>Register!</button>

          {this.state.message && <h3>{this.state.message}</h3>}
        </form>
      </div>
    );
  }
}

export default App;
