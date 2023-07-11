import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";

test('basic test', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/OMDB/i);
  expect(linkElement).toBeInTheDocument();
});
