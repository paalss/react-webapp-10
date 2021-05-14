import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const applyData = useCallback((tasksObject) => {
    const loadedTasks = [];

    for (const taskKey in tasksObject) {
      loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(
      {
        url: "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      },
      applyData
    );
  }, [applyData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
