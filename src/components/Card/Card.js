import React from 'react'
import './Card.scss';

export default function Card({ card }) {

    return (
        <div className='card-item'>
            {card.cover && 
            <img src={card.cover}
             className='card-cover' 
             onMouseDown={e => e.preventDefault()}
             alt="thuyetha" />}
            {card.title}
        </div>
    )
}
