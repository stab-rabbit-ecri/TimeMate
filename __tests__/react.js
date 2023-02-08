import React from 'react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
// import regeneratorRuntime from 'regenerator-runtime';

import App from '../client/App';
import LabeledText from '../client/Components/EmployeePage';
import LoginPage from '../client/Components/LoginPage';



describe('Login Page', () => {
 
    let App;

    const props = {
        isLoggedIn: false,
        role: '',
        emp_id: '',
        first_name: '',
    };

    
    

    // beforeAll(() => {
    //   App = render(<LoginPage {...props} />);
    // });

    test('Display all text props', () => {
        const loginpage = render(<LoginPage 
            />); // UserInput component and LoginButton
          expect(loginPage).toHaveLength(1)
        
      });
    }
)
    