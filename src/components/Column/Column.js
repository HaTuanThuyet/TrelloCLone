import Task from 'components/Task/Task';
import React from 'react'
import './Column.scss';


export default function Column() {
    return (
        <div className="column">
            <header>BrainStorm</header>
            <ul className='task-list'>
                <Task />

                <li className='task-item'>Add what you like to work on below</li>
                <li className='task-item'>Add what you like to work on below</li>
                <li className='task-item'>Add what you like to work on below</li>

            </ul>
            <footer>Add another Card</footer>
        </div>
    )
}
