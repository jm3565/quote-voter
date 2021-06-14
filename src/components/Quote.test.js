import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Quote from './Quote';

const quoteVotes = jest.fn(() => null);
const handleVoteChange = jest.fn();

test('should render quote component with given text', () => {
    const { container, getAllByTestId } = render(<Quote id='storage-key' text="Test quote" votes={quoteVotes} onVoteChange={handleVoteChange}/>);

    expect(container).toBeInTheDocument();

    let quoteText = getAllByTestId('quote-txt');
    expect(quoteText[0].textContent).toBe("\"Test quote\"");

    const countLabel = getAllByTestId('quote-votes')[0];
    expect(countLabel.textContent).toBe('0');
});

test('clicking the "Upvote" button should increment the number of votes for the quote', async () => {
    const { getAllByTestId } = render(<Quote id='storage-key' text="Test quote" votes={quoteVotes} onVoteChange={handleVoteChange}/>);
    const upVoteBtn = getAllByTestId('upvote-btn')[0];

    userEvent.click(upVoteBtn);
    expect(handleVoteChange).toHaveBeenCalledWith('storage-key', 1);
});


test('clicking the "Downvote" button should decrement the number of votes for the quote', () => {
    const { getAllByTestId } = render(<Quote id='storage-key' text="Test quote" votes={quoteVotes} onVoteChange={handleVoteChange}/>);
    const downVoteBtn = getAllByTestId('downvote-btn')[0];

    userEvent.click(downVoteBtn);
    expect(handleVoteChange).toHaveBeenCalledWith('storage-key', -1);
});
