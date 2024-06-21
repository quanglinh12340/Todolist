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
    const inputValue = inputRef.current.value.trim();

    const isDuplicate = todos.some(
      (todo) => inputRef.current.value.toUpperCase() === todo.text.toUpperCase()
    );

    if (inputValue === "") {
      alert("Write something");
      return;
    } 
     if (isDuplicate) {
      alert("Todo is already exist!");
      inputRef.current.value = "";
      return;
    } 
      setTodos([
        ...todos,
        {
          no: count++,
          text: inputRef.current.value,
          display: "",
        },
      ]);
      inputRef.current.value = "";
      inputRef.current.focus();
      localStorage.setItem("todos_count", count);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 300);
  }, [todos]);

  return (
    <div className={cx("todo")}>
      <div className={cx("todo-header")}>To-do List</div>
      <div className={cx("todo-add")}>
        <input
          ref={inputRef}
          type="text"
          className={cx("todo-input")}
          onKeyDown={handleEnter}
        />
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
