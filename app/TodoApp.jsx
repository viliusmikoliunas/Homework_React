import React from 'react';
import { render } from 'react-dom';
import {TodoItem, CompletedItem} from './TodoItem';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItemList: [
        <TodoItem key="1" id="1" title="item 1" deleteItem={this.deleteItem.bind(this)} handleItemAfterCheckboxClick={this.handleItemAfterCheckboxClick.bind(this)}/>,
        <TodoItem key="2" id="2" title="item 4" deleteItem={this.deleteItem.bind(this)} handleItemAfterCheckboxClick={this.handleItemAfterCheckboxClick.bind(this)}/>
      ],
    };
  }

  addTodoItem (e){
    e.preventDefault();
    //id cannot start with a number, su add a letter at the begining 
    let newId = 'tdi-' + Math.random().toString(36).substring(2, 15);
    this.setState({
      todoItemList: [
        <TodoItem 
          key={newId}
          id={newId}
          title={this.state.inputValue} 
          deleteItem={this.deleteItem.bind(this)}
          handleItemAfterCheckboxClick={this.handleItemAfterCheckboxClick.bind(this)}
        />,
        ...this.state.todoItemList
      ]    
    });
    this.state.inputValue = '';
  }

  deleteItem(itemId){
    let newList = this.state.todoItemList.filter(item => item.props.id !== itemId);
    this.setState({
      todoItemList: newList
    });
  }

  inputChanged(e){
    this.setState({
      inputValue: e.target.value
    });
  }

  handleItemAfterCheckboxClick(itemId){
    let item = this.state.todoItemList.filter(item => item.props.id === itemId)[0];
    let toDoTasks = this.state.todoItemList.filter(item => item.props.id !== itemId && item.type === TodoItem);
    let completedTasks = this.state.todoItemList.filter(item => item.props.id !== itemId && item.type === CompletedItem);
    if (item.type === TodoItem){
      completedTasks.push(<CompletedItem key={item.key} id={item.props.id} title={item.props.title} handleItemAfterCheckboxClick={this.handleItemAfterCheckboxClick.bind(this)}/>);
    }
    else{
      toDoTasks.push(<TodoItem key={item.key} id={item.props.id} title={item.props.title} deleteItem={this.deleteItem.bind(this)} handleItemAfterCheckboxClick={this.handleItemAfterCheckboxClick.bind(this)}/>);
    }
    //this approach makes sure that uncompleted tasks are always higher than completed ones
    let newList = toDoTasks.concat(completedTasks);
    this.setState(
      {
        todoItemList: newList,
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
