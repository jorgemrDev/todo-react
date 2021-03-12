import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddTask.scss";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import { isEmpty } from "lodash";
import firebase from "../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function AddTask(props) {
  const { setReloadTask } = props;
  const [task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty(task)) {
      db.collection("tasks")
        .add({
          name: task,
          completed: false,
        })
        .then(() => {
          setTask("");
          setReloadTask(true);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit} className="add-task">
      <input
        type="text"
        placeholder="Nueva tarea..."
        onChange={(e) => setTask(e.target.value)}
        value={task}
      ></input>
      <Button type="submit">
        <SendIcon />
      </Button>
    </Form>
  );
}
