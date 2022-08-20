import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { Container, Draggable } from "react-smooth-dnd"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container as BoostrapContainer, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import './BoardContent.scss'
import { isEmpty } from 'lodash'
import { initialData } from 'components/actions/initialData'

export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColoumn, setopenNewColoumn] = useState(false)
  const newColumnRef = useRef(null)
  const [newColumnTitle, setnewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) => setnewColumnTitle(e.target.value))
  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
    // console.log(boardFromDb.columns);
    if (boardFromDb) {
      setBoard(boardFromDb)
      //soft column

      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, 'id'))
    }
  }, [])
  useEffect(() => {
    if (newColumnRef && newColumnRef.current) {
      newColumnRef.current.focus()
      newColumnRef.current.select()

    }
  }, [openNewColoumn])

  if (isEmpty(board)) {
    return <div className='not-found' style={{ 'padding': '10px', 'color': 'white' }}> Board-not Found </div>
  }
  const onColumnDrop = (e) => {
    // console.log(e)
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, e)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    // console.log(newBoard)
    setColumns(newColumns)
    setBoard(newBoard)
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
    }
  }
  const toggleOpenNewColumn = () => setopenNewColoumn(!openNewColoumn)
  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnRef.current.focus()
      return
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cards: [],
      cardOrder: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
    setnewColumnTitle('')
    toggleOpenNewColumn()
  }
  const onUpdateColumns = (newColumnUpdate) => {
    console.log(newColumnUpdate)
    const columnIdToUpdate = newColumnUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)
    console.log(columnIndexToUpdate)
    if (newColumnUpdate._destroy) {
      // remove
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    console.log(newBoard)
    setColumns(newColumns)
    setBoard(newBoard)
  }
  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} onUpdateColumns={onUpdateColumns} />
          </Draggable>
        )
        )}
      </Container>
      <BoostrapContainer className='trello-container'>
        {!openNewColoumn &&
          <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumn}>
              <i className="fa fa-plus icon" /> Add another Card
            </Col>
          </Row>
        }
        {openNewColoumn &&
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size="sm"
                type="text"
                ref={newColumnRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
                placeholder="Enter Column title..."
                className='input-enter-new-column' />
              <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>
              <span className='cancel-new-column' onClick={toggleOpenNewColumn}><i className='fa fa-trash icon' /></span>
            </Col>
          </Row>
        }

      </BoostrapContainer>
    </div>
  )
}








