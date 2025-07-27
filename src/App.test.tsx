import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ThermaSim header', () => {
  render(<App />);
  const headerElement = screen.getByText(/ThermaSim/i);
  expect(headerElement).toBeInTheDocument();
});
