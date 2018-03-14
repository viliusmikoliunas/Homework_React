import React from 'react';
import { render } from 'react-dom';
import TodoItem from './TodoItem';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItemList: [
        <TodoItem key="1" id="1" title="item 1" deleteItem={this.deleteItem.bind(this)} />,
        <TodoItem key="2" id="2" title="item 4" deleteItem={this.deleteItem.bind(this)}/>
      ]
    };
  }

  addTodoItem (e){
    e.preventDefault();
    //id cannot start with a number, su add a letter at the begining 
    let newId = 'tdi-' + Math.random().toString(36).substring(2, 15);
    this.setState({
      todoItemList: [
        ...this.state.todoItemList, 
        <TodoItem 
          key={newId}
          id={newId}
          title={this.state.inputValue} 
          deleteItem={this.deleteItem.bind(this)}
        />
      ]
    });
  }

  deleteItem(itemId){
    let newList = this.state.todoItemList.filter(item => item.props.id !== itemId);
    this.setState({todoItemList: newList});
  }

  inputChanged(e){
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    const {todoItemList} = this.state;

    return <div>
            <h1>{this.props.header}</h1>
            <form onSubmit={this.addTodoItem.bind(this)}>
              <input type="text" onChange={this.inputChanged.bind(this)} value={this.state.inputValue}/>
            </form>

            <div>
              <ul>
                {this.state.todoItemList}
              </ul>
            </div>
        </div>
  }
}
