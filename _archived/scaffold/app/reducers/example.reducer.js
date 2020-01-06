export default function example(state = {}, action) {
  switch (action.type) {
    case 'EXAMPLE_SUCCESS': {
      console.log('there');
      return state;
    }
    default: {
      return state
    }
  }
}
