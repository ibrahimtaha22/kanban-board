import Column from "@/components/Column";
import { DataContext } from "@/DataContext";
import { useContext } from "react";
import { produce } from "immer";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom";

/**
 * @param {Object} props
 * @param {string} props.selectedBoardId - ID of the selected board
 * @returns {JSX.Element}
 */

function Workspace() {
  const { selectedBoardId: boardId } = useContext(DataContext);
  const {
    dataState,
    selectedBoardId,
    setDataState: setData,
  } = useContext(DataContext);

  const addNewColumnHandler = () => {
    const randomNo = Math.ceil(Math.random() * 5);
    const newColumn = {
      id: crypto.randomUUID(),
      title: `New Column${randomNo}`,
      tasks: [],
    };

    setData((prev) => {
      return produce(prev, (draft) => {
        const board = draft.find((board) => board.id === selectedBoardId);
        board?.columns.push(newColumn);
      });
    });
  };

  const boardColumns =
    dataState?.find((obj) => obj?.id === selectedBoardId)?.columns || [];
  const moveData = Object.fromEntries(
    boardColumns.map((column) => [
      column.id,
      column.tasks.map((task) => task.id),
    ]),
  );

  return (
    <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto px-6 pt-6">
      <DragDropProvider
        onDragOver={(event) => {
          const moveResult = move(moveData, event);
          setData((prev) =>
            produce(prev, (draft) => {
              const board = draft.find((board) => board.id === boardId);

              // Keep all task objects before changing any column.
              const allTasks = board.columns.flatMap((column) => column.tasks);

              board.columns.forEach((column) => {
                const orderedTaskIds = moveResult[column.id];

                column.tasks = orderedTaskIds.map((taskId) =>
                  allTasks.find((task) => task.id === taskId),
                );
              });
            }),
          );
        }}
        sensors={[
          PointerSensor.configure({
            activationConstraints: [
              new PointerActivationConstraints.Distance({
                value: 10,
              }),
            ],
          }),
        ]}
      >
        {boardColumns.map((column) => (
          <Column
            title={column.title}
            tasks={column.tasks}
            columnId={column.id}
            key={column.id}
          />
        ))}
      </DragDropProvider>
      <button
        className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3"
        onClick={() => {
          addNewColumnHandler();
        }}
      >
        + New Column
      </button>
    </div>
  );
}
export default Workspace;
