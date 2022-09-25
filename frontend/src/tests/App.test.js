import { render, screen } from '@testing-library/react';
import App from '../App';

test('Tests BugTracker Title Renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bug Tracker App/i);
  expect(linkElement).toBeInTheDocument();
});
