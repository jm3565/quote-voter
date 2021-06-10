import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Quote from './Quote';

test('should render quote component with given text', () => {
    const { container, getAllByTestId } = render(<Quote text="Test quote" onVoteChange={()=>{}}/>);
    expect(container).toBeInTheDocument();

    let quoteText = getAllByTestId('quote-txt');
    expect(quoteText[0].textContent).toBe("\"Test quote\"");
});

test('clicking the "Upvote" button should increment the number of votes for the quote', () => {
    const { getAllByTestId } = render(<Quote text="Test quote" onVoteChange={()=>{}}/>);
    const upVoteBtn = getAllByTestId('upvote-btn')[0];
    const countLabel = getAllByTestId('quote-votes')[0];
    

    userEvent.click(upVoteBtn);
    expect(countLabel.textContent).toBe('1');
    userEvent.click(upVoteBtn);
    userEvent.click(upVoteBtn);
    userEvent.click(upVoteBtn);
    expect(countLabel.textContent).toBe('4');
});


test('clicking the "Downvote" button should decrement the number of votes for the quote', () => {
    const { getAllByTestId } = render(<Quote text="Test quote" onVoteChange={()=>{}}/>);
    const downVoteBtn = getAllByTestId('downvote-btn')[0];
    const countLabel = getAllByTestId('quote-votes')[0];

    userEvent.click(downVoteBtn);
    expect(countLabel.textContent).toBe('-1');
    userEvent.click(downVoteBtn);
    userEvent.click(downVoteBtn);
    userEvent.click(downVoteBtn);
    expect(countLabel.textContent).toBe('-4');
});
