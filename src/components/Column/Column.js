import Card from 'components/Card/Card';
import React from 'react'
import './Column.scss';
import { mapOrder } from 'utilities/sorts';



export default function Column({column, index}) {
    const cards = mapOrder(column.cards,column.cardOrder,'id');
    return (
        <div className="column">
            <header>{column.title}</header>
            <ul className='card-list'>
                {cards.map((card,index) => <Card key={index} card={card}/>)}
               
            </ul>
            <footer>Add another Card</footer>
        </div>
    )
}


