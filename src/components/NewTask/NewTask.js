import { useState } from 'react';
import useHttpFetch from '../custom-hooks/use-http-fetch';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [taskText, setTaskText] = useState();
  

  const enterTaskHandler = async (inputText) => {
    setTaskText(inputText);
  };

  const reqData = {
    url: 'https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
    method: 'POST',
    request: JSON.stringify({ text: taskText })
  }

  const httpResponse = useHttpFetch(reqData);
  const generatedId = httpResponse.data.name; // firebase-specific => "name" contains generated id
  const createdTask = { id: generatedId, text: taskText };
  props.onAddTask(createdTask);
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={httpResponse.isLoading} />
      {httpResponse.error && <p>{httpResponse.error}</p>}
    </Section>
  );
};

export default NewTask;
