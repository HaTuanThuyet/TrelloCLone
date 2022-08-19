import Card from 'components/Card/Card';
import { Container, Draggable } from "react-smooth-dnd";
import React from 'react'
import './Column.scss';
import { mapOrder } from 'utilities/sorts';

export default function Column({ column, index }) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id');
    const onCardDrop = (e) => {
        console.log(e)
    }
    return (
        <div className="column">
            <header className='column-drag-handle'> {column.title}</header>
            <div className='card-list'>
                <Container
                    onDrop={onCardDrop}
                    getChildPayload={index => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    groupName='thuyetha'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                    
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
            </div>
            <footer>Add another Card</footer>
        </div>
    )
}










