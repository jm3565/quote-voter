import React from 'react'
import Quote from '../components/Quote'
import '../styles/quotes.css';
import getHash from '../getHash';

function List({items, onVoteChange}) {
    const handleQuoteVote = (id, newVotes) => {
        sessionStorage.setItem(id, `${newVotes}`);
        onVoteChange();
    }

    return (items.length > 0 ?
        <ul className='quotes-list'>
            {items.length > 0 && items.map((item, index) => {
                const quoteHash = getHash(item);
                return <Quote key={index} id={quoteHash} text={item} votes={sessionStorage.getItem(quoteHash)} onVoteChange={handleQuoteVote}></Quote>
            })}
        </ul> : <span className='empty-quotes-list-message'>Select a number of quotes to display from the dropdown or search for your favorite quote!</span>
    )
}

export default List
