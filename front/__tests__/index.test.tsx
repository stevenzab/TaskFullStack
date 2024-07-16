import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Ensures that Jest DOM assertions are available
import BridgeList from '../pages/index';

// describe('BridgeList Component', () => {
//   it('renders Bridges List heading', () => {
//     render(<BridgeList />);
    
//     // Check if the component renders the heading "Bridges List"
//     expect(screen.getByText('Bridges List')).toBeInTheDocument();
//   });
// }