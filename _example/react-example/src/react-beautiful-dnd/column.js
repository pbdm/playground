import React from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

export default class Column extends React.Component {
  render() {
    return (
      <div style={{
        border: '1px red solid',
        margin: 10,
        padding: 10
      }}>
        <div>{this.props.column.title}</div>
        {/* child 必须是 function */}
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
