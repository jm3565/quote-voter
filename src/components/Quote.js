import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import '../styles/quotes.css';

const Quote = ({id, text, votes, onVoteChange}) => {

    const getCurrentVotes = () => {
        if(typeof votes === 'string' && votes.length > 0){
            return parseInt(votes, 10);
        }

        return 0;
    }

    const upVote = () => {
        sessionStorage.setItem(id, `${getCurrentVotes() + 1}`);
        onVoteChange();
    }

    const downVote = () => {
        sessionStorage.setItem(id, `${getCurrentVotes() - 1}`);
        onVoteChange();
    }

    return (
        <li className='quote' data-testid='quotes-item'>
            <div className='voting-container'> 
                <IconButton aria-label="upvote" color='primary' onClick={upVote} data-testid='upvote-btn'>
                    <ThumbUpIcon />
                </IconButton>
                <span className='count' data-testid='quote-votes'>{getCurrentVotes()}</span>
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
