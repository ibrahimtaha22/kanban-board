import TextField from "@/components/TextField";
import iconCross from "@/assets/icon-cross.svg";
import Button from "@/components/Button";
import { useContext, useState } from "react";
import { DataContext } from "@/DataContext";

function AddNewBoardForm({ setOpen, boardData, boardId }) {
  const { columns, title: boardTitle } = boardData ?? {
    id: crypto.randomUUID(),
    title: "",
    columns: [{ id: crypto.randomUUID(), title: "", tasks: [] }],
  };

  const [columnsArray, setColumnsArray] = useState(columns);

  const { setDataState, setSelectedBoardId } = useContext(DataContext);

  const addColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: crypto.randomUUID() }]);
  };
  const removeColumnHandler = (removedId) => {
    setColumnsArray((prev) => prev.filter((obj) => obj.id !== removedId));
  };

  const renderedColumn = columnsArray.map((column) => {
    return (
      <div key={column.id} className="flex items-center gap-4">
        <TextField
          placeholder="e.g. Web Design"
          name={boardId ? column.id : "columnTitle"}
          defaultValue={column.title}
          required
        />
        <button
          type="button"
          onClick={() => {
            removeColumnHandler(column.id);
          }}
        >
          <img src={iconCross} alt="icon cross" />
        </button>
      </div>
    );
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const boardName = formData.get("boardName").trim();
    boardId && formData.delete("boardName");
    const columnArray = Object.entries(Object.fromEntries(formData));

    const columnsName = formData.getAll("columnTitle");
    const arrayOfcolumns = boardId
      ? columnArray.map((columnArr) => {
          return { id: columnArr[0], title: columnArr[1], tasks: [] };
        })
      : columnsName
          .filter((columnName) => columnName.trim() !== "")
          .map((columnName) => {
            return {
              id: crypto.randomUUID(),
              title: columnName,
              tasks: [],
            };
          });
    if (boardName?.length && arrayOfcolumns?.length) {
      const newIdBoard = boardId ? boardId : crypto.randomUUID();

      if (!boardId) setSelectedBoardId(newIdBoard);

      setDataState((prev) => {
        const newData = boardId
          ? prev.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    title: boardName,
                    columns: arrayOfcolumns,
                  }
                : board,
            )
          : [
              ...prev,
              {
                id: newIdBoard,
                title: boardName,
                columns: arrayOfcolumns,
              },
            ];
        return newData;
      });
      setOpen(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <div>
          <h3 className="text-medium-grey text-body-m pt-6 pb-2">Name</h3>
          <TextField
            placeholder="e.g. Web Design"
            name="boardName"
            defaultValue={boardId ? boardTitle : ""}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-body-m text-medium-grey pt-6">Columns</h3>
        </div>

        {renderedColumn}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          isFullWidth
          className="mt-2"
          onClick={() => {
            addColumnHandler();
          }}
        >
          + Add New Column
        </Button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="sm"
        isFullWidth
        className="mt-4"
      >
        {boardId ? "Edit" : "Create New"} Board
      </Button>
    </form>
  );
}
export default AddNewBoardForm;
