import React from 'react'
import Quote from '../components/Quote'
import '../styles/quotes.css';

function List({items, onVoteChange}) {
    return (
        <ul className='quotes-list'>
            {items.length > 0 && items.map((item, index) => {
                return <Quote key={index} text={item} onVoteChange={onVoteChange}></Quote>
            })}
        </ul>
    )
}

export default List
