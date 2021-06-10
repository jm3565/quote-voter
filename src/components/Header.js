import React from 'react';
import '../styles/header.css';

function Header({totalCount}) {
    return (
        <div className='header'>
            <div>
                <span className='title'>Ron Swanson Quote Voter</span>
                <span className='subtitle'>"Vote for your favorite quote!"</span>
            </div>
            <div>
                <span>Total Votes:</span>
                <span className='total-count' data-testid='total-count'>{totalCount}</span>
            </div>
        </div>
    )
}

export default Header;
