import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {
  InputTestkit,
  TextTestkit,
  ButtonTestkit,
} from 'wix-style-react/dist/testkit';

describe('App', () => {
  it('shows the submitted form part on submit', async () => {
    const wrapper = render(<App />);

    const firstNameInputDriver = InputTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'first-name-input',
    });

    const lastNameInputDriver = InputTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'last-name-input',
    });

    await firstNameInputDriver.enterText('Amit');
    await lastNameInputDriver.enterText('Sova');

    const submitButtonDriver = ButtonTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'submit-button',
    });

    await submitButtonDriver.click();

    const submittedTextDriver = TextTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'submitted-first-name',
    });

    expect(await submittedTextDriver.exists()).toBe(true);
  });

  it('doesnt show the submitted form part if not all mandatory fields submitted', async () => {
    const wrapper = render(<App />);

    const firstNameInputDriver = InputTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'first-name-input',
    });

    const submitButtonDriver = ButtonTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'submit-button',
    });

    await firstNameInputDriver.enterText('Amit');
    await submitButtonDriver.click();

    const submittedTextDriver = TextTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'submitted-first-name',
    });

    expect(await submittedTextDriver.exists()).toBe(false);
  });

  it('should clear the form on click on clear button', async () => {
    const wrapper = render(<App />);

    const firstNameInputDriver = InputTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'first-name-input',
    });

    const lastNameInputDriver = InputTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'last-name-input',
    });

    await firstNameInputDriver.enterText('Amit');
    await lastNameInputDriver.enterText('Sova');

    expect(await firstNameInputDriver.getValue()).toBe('Amit');
    expect(await lastNameInputDriver.getValue()).toBe('Sova');

    const clearButtonDriver = ButtonTestkit({
      wrapper: wrapper.baseElement,
      dataHook: 'clear-button',
    });

    await clearButtonDriver.click();

    expect(await firstNameInputDriver.getValue()).toBe('');
    expect(await lastNameInputDriver.getValue()).toBe('');
  });
});
