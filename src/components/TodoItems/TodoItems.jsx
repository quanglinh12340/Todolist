import { PropTypes } from "prop-types";
import classNames from "classnames/bind";
import styles from "./TodoItems.module.scss";
import { assets } from "@/assets";

const cx = classNames.bind(styles);

const TodoItems = ({ no, text, display }) => {
  return (
    <div className={cx("todo-items")}>
      <div className={cx("todo-items-container")}>
        <img src={assets.not_tick} />
        <img src={assets.tick} />
        <div className={cx("todo-items-text")}>{text}</div>
      </div>
      <img src={assets.cross} />
    </div>
  );
};

TodoItems.propTypes = {
  no: PropTypes.number,
  text: PropTypes.string,
  display: PropTypes.string,
};

export default TodoItems;
