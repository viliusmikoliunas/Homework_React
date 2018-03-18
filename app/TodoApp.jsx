import React from 'react';
import { render } from 'react-dom';
import {TodoItem, CompletedItem} from './TodoItem';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedItemsIdList: [],
      unfinishedItemsIdList: ['1','2'],
      inputValue: '',
      todoItemList: [
        <TodoItem key="1" id="1" title="item 1" deleteItem={this.deleteItem.bind(this)} handleItemCheck={this.handleItemCheck.bind(this)}/>,
        <TodoItem key="2" id="2" title="item 4" deleteItem={this.deleteItem.bind(this)} handleItemCheck={this.handleItemCheck.bind(this)}/>
      ],
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
          handleItemCheck={this.handleItemCheck.bind(this)}
        />
      ],
      unfinishedItemsIdList: [
        ...this.state.unfinishedItemsIdList,
        newId
      ]
    });
    this.state.inputValue = '';
  }

  deleteItem(itemId){
    let newList = this.state.todoItemList.filter(item => item.props.id !== itemId);
    let newUnfinishedIdList = this.state.unfinishedItemsIdList.filter(id => id !== itemId)
    this.setState({
      todoItemList: newList,
      unfinishedItemsIdList: newUnfinishedIdList
    });
  }

  inputChanged(e){
    this.setState({
      inputValue: e.target.value
    });
  }

  handleItemCheck(itemId){
    let newList = this.state.todoItemList.filter(item => item.props.id !== itemId);
    let item = this.state.todoItemList.filter(item => item.props.id === itemId)[0];
    let newUnfinishedIdList = this.state.unfinishedItemsIdList.filter(id => id !== itemId);
    let compl = this.state.completedItemsIdList;
    compl.push(item.props.id)
    let newItem = <CompletedItem key={item.key} id={item.props.id} title={item.props.title} handleItemUncheck={this.handleItemUncheck.bind(this)}/>
    newList.push(newItem);
    this.setState(
      {
        todoItemList: newList,
        unfinishedItemsIdList: newUnfinishedIdList,
        completedItemsIdList: compl
      });
  }

  handleItemUncheck(itemId){
    let newList = this.state.todoItemList.filter(item => item.props.id !== itemId);
    let newCompletedItemsIdList = this.state.completedItemsIdList.filter(id => id !== itemId);
    let toDoItems = this.state.unfinishedItemsIdList;
    let item = this.state.todoItemList.filter(item => item.props.id === itemId)[0];
    toDoItems.push(item.props.id)
    let newItem = <TodoItem key={item.key} id={item.props.id} title={item.props.title} deleteItem={this.deleteItem.bind(this)} handleItemCheck={this.handleItemCheck.bind(this)}/>
    newList.push(newItem);
    this.setState(
      {
        todoItemList: newList,
        unfinishedItemsIdList: toDoItems,
        completedItemsIdList: newCompletedItemsIdList
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
