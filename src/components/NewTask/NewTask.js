// prøvd ut ved commit bd3bcce
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [taskText, setTaskText] = useState();
  const createTask = (taskData, taskText) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    console.log(taskData);

    props.onAddTask(createdTask);
  };

  const {
    isLoading,
    error,
    sendRequest: sendTaskRequest,
  } = useHttp((data) => createTask(data, taskText));
  const enterTaskHandler = async (taskText) => {
    setTaskText(taskText);
  };

  useEffect(() => {
    sendTaskRequest(
      {
        url: "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(taskText, null)
    );
  }, [taskText]);

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
