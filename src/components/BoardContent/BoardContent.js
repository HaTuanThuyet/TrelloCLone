import Column from 'components/Column/Column';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dragDrop';
import { Container, Draggable } from "react-smooth-dnd";
import React, { useState, useEffect } from 'react'
import './BoardContent.scss';
import { isEmpty } from 'lodash';
import { initialData } from 'components/actions/initialData';

export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
    // console.log(boardFromDb.columns);
    if (boardFromDb) {
      setBoard(boardFromDb)
      //soft column

      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, 'id'))
    }
  }, [])
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
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        )
        )}
      </Container>
      <div className='add-new-column'>
        <i className="fa fa-plus icon" /> Add another Card
      </div>

    </div>
  )
}






