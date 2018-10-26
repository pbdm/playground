import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {/* child 必须是 function */}
        {provided => (
          <div
            {...provided.draggableProps}
            // 保证用户可以拖拽, 如果只想部分可拖拽, 这些属性可以放在子元素里; 
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              border: '1px solid black',
              marginBottom: 10,
              ...provided.draggableProps.style
            }}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    );
  }
}
