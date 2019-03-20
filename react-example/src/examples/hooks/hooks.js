import React, { useState, useEffect } from 'react';

export default function hooks() {

  // 只有在 count 变化后才会调用下面的逻辑
  const { count, setCount } = useCount(0);
  console.log('render ' + count)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function useCount(init) {
  const [count, setCount] = useState(init);
  
  useEffect(() => {
    console.log('useEffect ' + count)
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    // React cleans up effects:
    // when the component unmounts
    // from the previous render before running the effects next time
    return () => {
      console.log('cleanup ' + count)
    };
  }, [count]); // Only re-run the effect if count changes
  return {
    count,
    setCount
  }
}