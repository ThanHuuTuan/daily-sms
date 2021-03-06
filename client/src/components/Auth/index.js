import React from 'react';
import ReactLoading from 'react-loading';

import {
  FilledBackground,
  InputWrapper,
  Input,
  CountryCodeText,
  Line,
  Subtext,
  ErrorText
} from './styles';
import Button from 'components/Button';
import PhoneInput from 'react-phone-number-input';

const LOADING_SIZE = 25;

const renderButtonContent = (renderLoadingIndicator, buttonText) =>
  renderLoadingIndicator ? (
    <ReactLoading type="spinningBubbles" height={LOADING_SIZE} width={LOADING_SIZE} />
  ) : (
    buttonText
  );

const Auth = ({
  handleSubmit,
  handleInputChange,
  handleKeyDown,
  renderLoadingIndicator,
  phoneNumber,
  isDisabled,
  subtextOne,
  subtextTwo,
  buttonText
}) => (
  <FilledBackground>
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <div>
          <CountryCodeText>USA (+1)</CountryCodeText>
          <Line />
          <Input
            placeholder="Your Phone Number"
            value={phoneNumber.value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            name={phoneNumber.name}
            autoFocus
          />
          <Line />
          {phoneNumber.errorText && <ErrorText>{phoneNumber.errorText}</ErrorText>}
          {subtextOne && <Subtext>{subtextOne}</Subtext>}
          {subtextTwo && <Subtext>{subtextTwo}</Subtext>}
        </div>
        <div>
          <Button
            width="100%"
            onClick={handleSubmit}
            fontSize="18px"
            uppercase
            isDisabled={isDisabled}>
            {renderButtonContent(renderLoadingIndicator, buttonText)}
          </Button>
        </div>
      </InputWrapper>
    </form>
  </FilledBackground>
);

export default Auth;
