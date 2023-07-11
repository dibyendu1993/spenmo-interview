import ShowDetails from "../Screens/Showdetails";

import { render, screen, cleanup } from '@testing-library/react';

test('test', () => {
    render(<ShowDetails />);
    const showDetailsId = screen.getByTestId("showDetails")
    expect(showDetailsId).toBeInTheDocument();
})