import Column from 'components/Column/Column';
import { mapOrder } from 'utilities/sorts';
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
    console.log(boardFromDb.columns);
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
    console.log(e)
  }
  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index =>columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} />
          </Draggable>
        )
        )}
      </Container>

    </div>
  )
}






