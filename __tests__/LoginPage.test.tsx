import * as loginAction from '@/actions/login';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from 'src/app/(app)/(auth)/login/page';

jest.mock('../src/actions/login');

describe('LoginPage', () => {
  it('renders without crashing', () => {
    render(<LoginPage />);
    const linkElement = screen.getByText(/Log In/);
    expect(linkElement).toBeInTheDocument();
  });

  it('submits the form with correct credentials', async () => {
    const mockedLogin = loginAction.login as jest.MockedFunction<
      typeof loginAction.login
    >;

    // Mock successful login (redirect is ignored in test)
    mockedLogin.mockResolvedValueOnce({ message: '' });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '#testpass11' },
    });

    fireEvent.click(screen.getByText(/Log In/));
    console.log(mockedLogin.mock.calls);
    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith(undefined, {
        username: 'testuser',
        password: '#testpass11',
      });
    });

    // Optional: assert form resets, error messages aren't shown, etc.
    expect(
      screen.queryByText(/Incorrect username or password/),
    ).not.toBeInTheDocument();
  });

  it('displays error message for incorrect credentials', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByText(/Log In/));
    const errorMessage = await screen.findByText(
      /Incorrect username or password./,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
