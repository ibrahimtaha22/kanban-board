import DropdownPrimitive from "@/components/DropdownPrimitive";
import verticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg";
import DialogPrimitive from "@/components/DialogPrimitive";
import { useContext, useState } from "react";
import { DataContext } from "@/DataContext";
import AddNewBoardForm from "@/components/AddNewBoardForm";

function Header() {
  const [open, setOpen] = useState(false);
  const { selectedBoardId, setDataState, setSelectedBoardId, dataState } =
    useContext(DataContext);

  const onEditBoard = () => {
    setOpen(true);
  };
  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      setDataState((prev) => {
        const selectedIndex = prev.findIndex(
          (board) => board.id === selectedBoardId,
        );
        const newData = prev.filter((board) => board.id !== selectedBoardId);
        setSelectedBoardId(newData[selectedIndex]?.id ?? null);

        return newData;
      });
    }
  };
  const selectedIndex = dataState.findIndex(
    (board) => board.id === selectedBoardId,
  );
  const boardData = dataState[selectedIndex];
  return (
    <header className="flex h-24.5 shrink-0 items-center">
      <div className="border-lines-light flex w-75 items-center self-stretch border-r border-b pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="border-lines-light flex w-75 flex-1 items-center justify-around self-stretch border-r border-b pl-8 text-[32px] font-bold">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <DropdownPrimitive
          items={{
            edit: {
              label: "Edit Board",
              onClick: () => {
                onEditBoard();
              },
            },
            delete: {
              label: "Delete Board",
              onClick: () => {
                onDeleteBoard();
              },
            },
          }}
          triggerComponent={() => (
            <button className="text-main-purple flex cursor-pointer items-center gap-2 rounded-full p-3 text-[14px] font-bold">
              <img
                className="select-none"
                src={verticalEllipsisIcon}
                alt="icon vertical ellipsis"
              />
            </button>
          )}
        />

        <DialogPrimitive title="Edit Board" open={open} setOpen={setOpen}>
          <AddNewBoardForm
            setOpen={setOpen}
            boardData={boardData}
            boardId={selectedBoardId}
          />
        </DialogPrimitive>
      </div>
    </header>
  );
}

export default Header;
