import Card from 'components/Card/Card';
import { Container, Draggable } from "react-smooth-dnd";
import React from 'react'
import './Column.scss';
import { mapOrder } from 'utilities/sorts';

export default function Column({ column, onCardDrop }) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id');


    return (
        <div className="column">
            <header className='column-drag-handle'> {column.title}</header>
            <div className='card-list'>
                <Container
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
            <footer>
                <div className="footer-actions">
                    <i className="fa fa-plus icon" /> Add another Card
                </div>
            </footer>
        </div>
    )
}











