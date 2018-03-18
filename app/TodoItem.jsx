import React from 'react';

export const TodoItem = (props) =>{
    return <ul>
        <input type="checkbox" onClick={() => props.handleItemCheck(props.id)}/>
        {props.title} -
        <button onClick={() => props.deleteItem(props.id)}>Delete</button>
    </ul>
}

export const CompletedItem = (props) => {
    return <ul>
    <input checked readOnly type="checkbox" onClick={() => props.handleItemUncheck(props.id)}/>
    {props.title}
    </ul>
}
