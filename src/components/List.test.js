import { render, screen } from '@testing-library/react';
import List from './List';

let myTestQuotes = [];

beforeAll(()=>{
    myTestQuotes = [
        'First quote',
        'Second quote',
        'Third quote'
    ]
})

test('should render list component with 3 quotes', () => {
    const { container, getAllByTestId } = render(<List items={myTestQuotes} onVoteChange={()=>{}}/>);
    expect(container).toBeInTheDocument();

    let quoteEls = getAllByTestId('quotes-item');
    expect(quoteEls.length).toBe(3);
});
