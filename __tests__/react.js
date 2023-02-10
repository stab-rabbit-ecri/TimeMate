import React from 'react';
// import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import App from '../client/App';
import LabeledText from '../client/Components/EmployeePage';
import LoginPage from '../client/Components/LoginPage';

test('Renders the login page', () => {
  render(<App />);
});