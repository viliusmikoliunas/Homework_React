import React from 'react';
import { render } from 'react-dom';
import TodoApp from './TodoApp.jsx';
import './styles.css';

render(<TodoApp header="Naujas Header"/>, document.querySelector('.react-app'));