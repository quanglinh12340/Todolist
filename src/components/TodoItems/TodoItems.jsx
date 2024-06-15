import { PropTypes } from "prop-types";
import classNames from "classnames/bind";
import styles from "./TodoItems.module.scss";
import { assets } from "@/assets";

const cx = classNames.bind(styles);

const TodoItems = ({ no, text, display, setTodos }) => {
  const deleteTodo = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    console.log("🚀 ~ deleteTodo ~ data:", data);
    data = data.filter((todo) => todo.no !== no);
    setTodos(data);
  };

  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  };

  return (
    <div className={cx("todo-items")}>
      <div
        className={cx("todo-items-container", `${display}`)}
        onClick={() => toggle(no)}
      >
        {display === "" ? (
          <img src={assets.not_tick} />
        ) : (
          <img src={assets.tick} />
        )}
        <div className={cx("todo-items-text")}>{text}</div>
      </div>
      <img src={assets.cross} onClick={() => deleteTodo(no)} />
    </div>
  );
};

TodoItems.propTypes = {
  no: PropTypes.number,
  text: PropTypes.string,
  display: PropTypes.string,
  setTodos: PropTypes.func,
};

export default TodoItems;
