import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    console.log('ondragend', result);
    const { destination, source, draggableId } = result;
    const { columns } = this.state
    if (!destination) {
      return;
    }
    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      this.setState({
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      })
    } else {
      const startTaskIds = Array.from(start.taskIds);
      const finishTaskIds = Array.from(finish.taskIds);
      startTaskIds.splice(source.index, 1);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const startColumn = {
        ...start,
        taskIds: startTaskIds
      }
      const finishColumn = {
        ...finish,
        taskIds: finishTaskIds
      }
      this.setState({
        columns: {
          ...columns,
          [startColumn.id]: startColumn,
          [finish.id]: finishColumn
        }
      })

    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
