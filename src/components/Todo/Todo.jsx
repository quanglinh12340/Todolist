import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Todo.module.scss";
import TodoItems from "../TodoItems";

const cx = classNames.bind(styles);

let count = 0;

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      {
        no: count++,
        text: inputRef.current.value,
        display: "",
      },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  return (
    <div className={cx("todo")}>
      <div className={cx("todo-header")}>To-do List</div>
      <div className={cx("todo-add")}>
        <input ref={inputRef} type="text" className={cx("todo-input")} />
        <div className={cx("todo-add-btn")} onClick={() => add()}>
          ADD
        </div>
      </div>
      <div className={cx("todo-list")}>
        {todos.map((item, index) => {
          return (
            <TodoItems
              key={index}
              no={item.no}
              text={item.text}
              display={item.display}
              setTodos={setTodos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
