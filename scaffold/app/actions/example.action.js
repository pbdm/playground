import API from '../../common/libs/api';

export function example() {
  return dispatch => {
    dispatch({
      type: 'EXAMPLE',
      payload: API({
        data: {
          _mt: 'wukong.getDocuments',
          key: 'yao'
        },
        level: 'None'
      })
    }).then((data) => {
      console.log(data)
    })
  };
}
