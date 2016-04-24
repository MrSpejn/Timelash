import React, { Component } from 'react';
import {reduxForm}          from 'redux-form';
import {userSignin}         from 'actions/auth';

class Signin extends Component {
  handleFormSubmit(formProps) {
    console.log(formProps);
  }
  render() {
    const {handleSubmit, fields: {password, login}} = this.props;
    return (
      <form name='signin' onSubmit={handleSubmit((d) => this.handleFormSubmit(d))}>
        <fieldset>
          <label>Login: </label>
          <input {...login} type='text' />
        </fieldset>
        <fieldset>
          <label>Password: </label>
          <input {...password} type='password' />
        </fieldset>
        <button type='submit'>Sign in</button>
      </form>
    );
  }
}
export default reduxForm({
  form: 'signin',
  fields: ['login', 'password']
}, null, {userSignin})(Signin);