import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import DetailedBug from '../components/DetailedBug/DetailedBug';


test('Test No Bugs added', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('viewBugsTab'));
  
  expect(screen.getByText(/There are no Bugs/i)).toBeInTheDocument();

});

