import Column from 'components/Column/Column';
import { mapOrder } from 'utilities/sorts';
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
      
      setColumns(mapOrder(boardFromDb.columns,boardFromDb.columnOrder,'id'))
    }
  }, [])
  if (isEmpty(board)) {
    return <div className='not-found' style={{ 'padding': '10px', 'color': 'white' }}> Board-not Found </div>
  }

  return (
    <div className="board-content">
      {columns.map((column, index) => <Column key={index} column={column}/>)}
    </div>
  )
}





