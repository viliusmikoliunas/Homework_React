import React from 'react';
import { render } from 'react-dom';
import TodoItem from './TodoItem';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItemList: [
        <TodoItem key="1" title="item 1" deleteItem={this.deleteItem} />,
        <TodoItem key="2" title="item 4" deleteItem={this.deleteItem}/>
      ]
    };
  }

  addTodoItem (e){
    e.preventDefault();
    this.setState({
      todoItemList: [...this.state.todoItemList, <TodoItem key="3" title={this.state.inputValue} deleteItem={this.deleteItem}/>]
    });
  }

  deleteItem(){
    console.log('delete it!');
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
