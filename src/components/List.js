import React from 'react'
import Quote from '../components/Quote'
import '../styles/quotes.css';

function List({items, onVoteChange}) {
    return (items.length > 0 ?
        <ul className='quotes-list'>
            {items.length > 0 && items.map((item, index) => {
                return <Quote key={index} text={item} onVoteChange={onVoteChange}></Quote>
            })}
        </ul> : <span className='empty-quotes-list-message'>Select a number of quotes to display from the dropdown or search for your favorite quote!</span>
    )
}

export default List
