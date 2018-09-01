import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUp from './';
import api from 'api';
import { registerUser } from 'redux/auth/actions';
import { isCreateError } from 'utils/errors';

const isDigit = ({ key }) => key !== 'Backspace';

const isValidSubmission = ({ key }, isDisabled) => key === 'Enter' && !isDisabled;

const isInvalidKey = ({ key }) => isNaN(key) && key !== 'Backspace';

class SignUpContainer extends Component {
  state = {
    phoneNumber: {
      value: '',
      name: 'phoneNumber',
      errorText: ''
    },
    countryCode: {
      value: 1
    },
    renderLoadingIndicator: false,
    isDisabled: true
  };

  handleKeyDown = async (e) => {
    const { value } = this.state.phoneNumber;
    const { isDisabled } = this.state;

    switch (true) {
      case isValidSubmission(e, isDisabled):
        this.handleSubmit(e);
        return;
      case isInvalidKey(e):
        e.preventDefault();
        return;
      case isDigit(e):
        return;
      default:
        e.preventDefault();
        break;
    }

    await this.setState({
      phoneNumber: {
        ...this.state.phoneNumber,
        errorText: '',
        value: value.slice(0, -1)
      },
      isDisabled: true
    });
  };

  handleInputChange = async (e) => {
    const { phoneNumber, isDisabled } = this.state;
    const phoneNumberLength = phoneNumber.value.length;

    if (phoneNumberLength >= 14) return;

    let value;

    switch (phoneNumberLength) {
      case 0:
        value = `(${e.target.value}`;
        break;
      case 3:
        value = `${e.target.value}) `;
        break;
      case 8:
        value = `${e.target.value}-`;
        break;
      default:
        value = e.target.value;
        break;
    }

    if (phoneNumberLength >= 13) this.setState({ isDisabled: false });

    this.setState({
      phoneNumber: {
        ...this.state.phoneNumber,
        value
      }
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { phoneNumber, countryCode, isDisabled } = this.state;

    if (isDisabled) return;

    this.setState({ renderLoadingIndicator: true });

    const { error, ...res } = await this.props.registerUser({ phoneNumber, countryCode });

    error ? this.handleRequestError(res) : this.handleRequestSuccess(res);
  };

  handleRequestError = (error) => {
    this.setState({
      phoneNumber: {
        ...this.state.phoneNumber,
        errorText: error.message
      },
      renderLoadingIndicator: false
    });
  };

  handleRequestSuccess = ({ verified, user_id }) => {
    const { history } = this.props;

    verified ? history.push('/dashboard') : history.push(`/verify/${user_id}`);
  };

  render() {
    return (
      <SignUp
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        handleKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default connect(null, { registerUser })(SignUpContainer);
