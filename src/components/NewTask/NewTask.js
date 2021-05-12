import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const applyData = (data) => {
      console.log("data: ", data);
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      console.log("createdTask: ", createdTask);
      props.onAddTask(createdTask);
    };
    sendRequest(
      {
        url: "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      applyData
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
