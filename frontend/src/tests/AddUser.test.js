import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import AddUser from '../components/AddUser/AddUser';


test('Test No Users added', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('addUserTab'));
  expect(screen.getByText(/There are no Users/i)).toBeInTheDocument();

});

