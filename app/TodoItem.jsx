import React from 'react';

const TodoItem = (props) =>{
    return <li>{props.title} - <span onClick={() => props.deleteItem()}>Delete</span></li>
}

export default TodoItem;