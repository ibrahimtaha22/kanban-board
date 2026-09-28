import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

/**
 * @param {Object} props
 * @param {Object} props.task - Card Task object containing details like title
 * @returns {JSX.Element}
 */
function Card({ task, columnId, index }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id: taskId } = task;
  const { setDataState: setData, selectedBoardId: boardId } =
    useContext(DataContext);
  const removeTaskHandler = () => {
    setData((prev) => {
      return produce(prev, (draft) => {
        const board = draft.find((board) => board.id === boardId);
        const column = board?.columns.find((column) => column.id === columnId);
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      });
    });
  };

  const editModeHandler = () => {
    setIsEditMode(true);
  };

  const onFocusHandler = (e) => {
    e.target.select();
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    setData((prev) =>
      produce(prev, (draft) => {
        const board = draft.find((board) => board.id === boardId);
        const column = board?.columns.find((column) => column.id === columnId);
        const task = column.tasks.find((task) => task.id === taskId);
        if (task) {
          task.title = e.target.value;
        }
      }),
    );
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const { ref, isDragging } = useSortable({
    id: taskId,
    index,
    type: "item",
    accept: "item",
    group: columnId,
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="Item group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
    >
      {isEditMode ? (
        <textarea
          name="textArea"
          className="text-heading-m outline-light-grey h-full resize-none"
          defaultValue={task.title}
          autoFocus
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
        ></textarea>
      ) : (
        <button className="text-heading-m" onClick={editModeHandler}>
          {task.title}
        </button>
      )}
      <button
        className="text-body-m text-red absolute top-0 right-0 bottom-0 cursor-pointer bg-white p-2 opacity-0 shadow duration-300 group-hover/card:opacity-100 peer-focus:opacity-100 focus:opacity-100"
        onClick={removeTaskHandler}
      >
        Delete
      </button>
    </div>
  );
}
export default Card;
