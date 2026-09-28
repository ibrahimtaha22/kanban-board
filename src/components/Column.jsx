import Card from "@/components/Card";
import { DataContext } from "@/DataContext";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

import { produce } from "immer";
import { useContext } from "react";

/**
 * @param {Object} props
 * @param {string} props.title - Title of the column
 * @param {Array} props.tasks  - Array of Tasks
 * @returns {JSX.Element}
 */

function Column({ title, tasks, columnId }) {
  const { selectedBoardId: boardId, setDataState: setData } =
    useContext(DataContext);

  const addTaskHandler = () => {
    const task = {
      id: crypto.randomUUID(),
      title: `New Task`,
    };

    setData((prev) => {
      return produce(prev, (draft) => {
        const board = draft.find((board) => board.id === boardId);
        const column = board?.columns?.find((column) => column.id === columnId);
        column?.tasks.push(task);
      });
    });
  };

  const onDeleteHandler = () => {
    if (confirm(`Are you sure removing "${title}"`))
      setData((prev) =>
        produce(prev, (draft) => {
          const board = draft.find((board) => board.id === boardId);
          if (board?.columns) {
            // Target the object key to change; Immer handles the immutable update.
            board.columns = board.columns.filter(
              (column) => column.id !== columnId,
            );
          }
        }),
      );
  };

  const { ref } = useDroppable({
    id: columnId,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className="bg-lines-light flex w-72 shrink-0 flex-col self-start rounded-lg px-2 shadow"
    >
      <h2 className="Column group/column text-heading-s bg-lines-light relative top-0 rounded px-2 py-4">
        {title}({tasks.length})
        <button
          className="text-body-m text-red absolute top-0 right-0 bottom-0 p-2 opacity-0 duration-300 group-hover/column:opacity-100 focus:opacity-100"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </h2>

      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((task, index) => (
          <Card key={task.id} task={task} columnId={columnId} index={index} />
        ))}
      </div>

      <button
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey mx-2 mt-auto border-t px-2 py-4"
        onClick={() => {
          addTaskHandler();
        }}
      >
        + Add New Task
      </button>
    </div>
  );
}
export default Column;
