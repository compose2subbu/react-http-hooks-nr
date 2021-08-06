import React, { useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpFetch from './components/custom-hooks/use-http-fetch'


function App() {

  const [tasks, setTasks] = useState([]);

  const reqData = {
    url: 'https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
    method: 'GET',
    request: ''
  }

  const httpResponse = useHttpFetch(reqData);

  const loadedTasks = [];

  for (const taskKey in httpResponse.data) {
    loadedTasks.push({ id: taskKey, text: httpResponse.data[taskKey].text });
  }
  setTasks(loadedTasks);


  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpResponse.isLoading}
        error={httpResponse.error}
        onFetch={loadedTasks}
      />
    </React.Fragment>
  );
}

export default App;
