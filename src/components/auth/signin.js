import React, { Component } from 'react';
import {reduxForm}          from 'redux-form';
import {userSignin}         from 'actions/auth';

class Signin extends Component {
  handleFormSubmit(formProps) {
    this.props.userSignin(formProps);
  }
  render() {
    const {handleSubmit, fields: {password, login}} = this.props;
    return (
      <form className="signin" ame='signin' onSubmit={handleSubmit((d) => this.handleFormSubmit(d))}>
        <fieldset>
          <label>Login: </label>
          <input {...login} type='text' />
        </fieldset>
        <fieldset>
          <label>Password: </label>
          <input {...password} type='password' />
        </fieldset>
        <span>{this.props.errorMessage}</span>
        <button type='submit'>Sign in</button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {errorMessage: state.errors.auth};
}

export default reduxForm({
  form: 'signin',
  fields: ['login', 'password']
}, mapStateToProps, {userSignin})(Signin);