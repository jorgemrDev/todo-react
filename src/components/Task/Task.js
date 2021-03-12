import "./Task.scss";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import "./Task.scss";
import firebase from "../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Task(props) {
  const { task, setReloadTask } = props;

  const completeTask = () => {
    db.collection("tasks")
      .doc(task.id)
      .update({
        completed: !task.completed,
      })
      .then(() => {
        setReloadTask(true);
      });
  };

  const deleteTask = () => {
    db.collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        setReloadTask(true);
      });
  };

  return (
    <div className="task">
      <div>
        <CheckIcon
          onClick={completeTask}
          className={task.completed ? "completed" : ""}
        />
      </div>
      <div>{task.name}</div>
      <div>
        <DeleteIcon onClick={deleteTask} />
      </div>
    </div>
  );
}
