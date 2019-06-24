const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 't1c'},
    'task-2': { id: 'task-2', content: 't2c'},
    'task-3': { id: 'task-3', content: 't3c'},
    'task-4': { id: 'task-4', content: 't4c'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'in progress',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
}

export default initialData;
