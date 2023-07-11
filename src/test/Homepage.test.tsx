import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import HomePage from "../Screens/HomePage";
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

test('basic test', () => {
    render(<BrowserRouter><HomePage /></BrowserRouter>);
    const homePageId = screen.getByTestId("homePage")
    expect(homePageId).toBeInTheDocument();
})