import Card from 'components/Card/Card'
import { Container, Draggable } from "react-smooth-dnd"
import Dropdown from 'react-bootstrap/Dropdown'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Column.scss';
import { mapOrder } from 'utilities/sorts'
import ConfilmMode from 'components/Common/ConfilmModel'
import { MODAL_ACTION_CONFLIM } from 'utilities/constants'
import Form from 'react-bootstrap/Form'
import { Container as BoostrapContainer, Row, Col, Button } from 'react-bootstrap'
import { saveContentAffterEnter, selectAllInlineText } from 'utilities/contentEditable';
import { cloneDeep } from 'lodash'
export default function Column({ column, onCardDrop, onUpdateColumns, }) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const mewCardTextRef = useRef(null)
    const [showConfilmModle, setshowConfilmModle] = useState(false)
    const [columnTitle, setcolumnTitle] = useState('')

    const [newCardTitle, setnewCardTitle] = useState('')
    const onNewCardTitleChange = useCallback((e) => setnewCardTitle(e.target.value))
    useEffect(() => {
        setcolumnTitle(column.title)
    }, [column.title])

    const handleColumnChange = useCallback((e) => setcolumnTitle(e.target.value), [])
    const [openNewCard, setopenNewCard] = useState(false)
    const toggleOpenNewCard = () => setopenNewCard(!openNewCard)
    const handleColumnBluer = () => {
        // console.log(columnTitle)
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumns(newColumn)
    }
    useEffect(() => {
        if (mewCardTextRef && mewCardTextRef.current) {
            mewCardTextRef.current.focus()
            mewCardTextRef.current.select()

        }
    }, [openNewCard])

    const onConFIlmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFLIM) {
            const newColumn = {
                ...column,
                _destroy: true,

            }
            onUpdateColumns(newColumn)
        }
        toggleConfilmModel()
    }
    const toggleConfilmModel = () => {
        setshowConfilmModle(!showConfilmModle)
    }
    const addNewCard = () => {
        if (!newCardTitle) {
            mewCardTextRef.current.focus()
            return
        }
        const newCardToAdd = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: column.boardId,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null
        }
       let newColumn =cloneDeep(column)
       newColumn.cards.push(newCardToAdd)
       newColumn.cardOrder.push(newCardToAdd.id)
       onUpdateColumns(newColumn)
       setnewCardTitle('')
       toggleOpenNewCard()

    }
    return (
        <div className="column">
            <header className='column-drag-handle'>
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        value={columnTitle}
                        onClick={selectAllInlineText}
                        onChange={handleColumnChange}
                        onBlur={handleColumnBluer}
                        onKeyDown={saveContentAffterEnter}
                        onMouseUpCapture={e => e.preventDefault}
                        className='thuyet-content-editable'
                        spellCheck='false'
                    />


                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle size='sm' id="dropdown-basic" className="dropdownbtn" />

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={toggleOpenNewCard}>Add Card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleConfilmModel}>Remove Column...</Dropdown.Item>
                            <Dropdown.Item >Move All cards in thí column (beta) ...</Dropdown.Item>
                            <Dropdown.Item >Archive All cards in thí column (beta)...</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </header>


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
                {openNewCard &&
                    <div className="add-new-card-area">
                        <Form.Control
                            size="sm"
                            as="textarea"
                            rows='3'
                            ref={mewCardTextRef}
                            value={newCardTitle}
                            onChange={onNewCardTitleChange}
                            onKeyDown={e => (e.key === 'Enter') && addNewCard()}
                            placeholder="Enter title for this card..."
                            className='textarea-enter-new-card' />

                    </div>
                }
            </div>
            <footer>
                {openNewCard &&
                    <div className="add-new-card-actions">
                        <Button variant="success" size='sm' onClick={addNewCard} >Add Card</Button>
                        <span className='cancel-icon' onClick={toggleOpenNewCard}><i className='fa fa-trash icon' /></span>
                    </div>
                }
                {!openNewCard && <div className="footer-actions" onClick={toggleOpenNewCard}>
                    <i className="fa fa-plus icon" /> Add another Card
                </div>}
            </footer>
            <ConfilmMode
                show={showConfilmModle}
                onAction={onConFIlmModalAction}
                titile='Remove Column'
                content={`Are you sure you want to remove <strong>${column.title}</strong>.</br> All related cards will also be remove!`} />
        </div>
    )
}











