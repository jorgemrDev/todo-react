import { useState, useEffect } from "react";

import { Container, Row, Col, Spinner } from "react-bootstrap";

import firebase from "./utils/firebase";
import "./App.scss";
import AddTask from "./components/AddTask";
import "firebase/firestore";
import { map, size } from "lodash";
import Task from "./components/Task";

const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTask, setReloadTask] = useState(false);

  useEffect(() => {
    db.collection("tasks")
      .orderBy("completed")
      .get()
      .then((response) => {
        const arrayTasks = [];
        map(response.docs, (task) => {
          const data = task.data();
          data.id = task.id;
          arrayTasks.push(data);
        });
        setTasks(arrayTasks);
      });
    setReloadTask(false);
  }, [reloadTask]);

  return (
    <Container className="app" fluid>
      <div className="title">
        <h1>Jorge Moreno Rodriguez</h1>
      </div>

      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Today</h2>
        </Col>

        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) === 0 ? (
            <h3>No hay tareas</h3>
          ) : (
            map(tasks, (task) => (
              <Task
                key={task.id}
                setReloadTask={setReloadTask}
                task={task}
              ></Task>
            ))
          )}
        </Col>

        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask setReloadTask={setReloadTask}></AddTask>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
