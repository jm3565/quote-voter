import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import '../styles/quotes.css';

const Quote = ({text, onVoteChange}) => {
    const [votes, setVotes] = useState(0);

    const upVote = () => {
        setVotes(votes + 1);
        onVoteChange();
    }

    const downVote = () => {
        setVotes(votes - 1);
        onVoteChange();
    }

    return (
        <li className='quote' data-testid='quotes-item'>
            <div className='voting-container'> 
                <IconButton aria-label="upvote" color='primary' onClick={upVote} data-testid='upvote-btn'>
                    <ThumbUpIcon />
                </IconButton>
                <span className='count' data-testid='quote-votes'>{votes}</span>
                <IconButton aria-label="downvote" color='secondary' onClick={downVote} data-testid='downvote-btn'>
                    <ThumbDownIcon />
                </IconButton>
            </div>
            <div>
                <span data-testid='quote-txt'>"{text}"</span>
            </div>
        </li>
    )
}

export default Quote;
