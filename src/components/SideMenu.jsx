import clsx from "clsx";
import { useContext } from "react";
import iconBoard from "@/assets/icon-board.svg";
import DialogPrimitive from "@/components/DialogPrimitive";
import { DataContext } from "@/DataContext";
import AddNewBoardForm from "@/components/AddNewBoardForm";

/**
 * SideMenu component to display and select available boards.
 * @returns {JSX.Element}
 */

function SideMenu() {
  const {
    dataState = [],
    open,
    setOpen,
    selectedBoardId,
    setSelectedBoardId,
  } = useContext(DataContext);
  return (
    <aside className="side-menu border-lines-light -mt-px h-full w-75 shrink-0 border-r bg-white">
      <p className="text-heading-s px-8 py-4 font-bold">
        ALL BOARDS ({dataState?.length})
      </p>
      <ul>
        {dataState.map((item) => (
          <li key={item.id}>
            <button
              className={clsx(
                "text-heading-m text-medium-grey data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 font-bold transition hover:cursor-pointer",
                {
                  "bg-main-purple hover:bg-main-purple text-white":
                    selectedBoardId === item.id,
                },
              )}
              onClick={() => {
                setSelectedBoardId(item.id);
              }}
              data-isactive={selectedBoardId === item.id}
            >
              <img src={iconBoard} alt="icon-board" /> {item.title}
            </button>
          </li>
        ))}
        <li className="px-8 py-4">
          <DialogPrimitive
            title="Create New Board"
            open={open}
            setOpen={setOpen}
            triggerComponent={() => (
              <button
                className="text-main-purple text-heading-m flex w-full items-center gap-4"
                data-isactive={false}
              >
                <img src={iconBoard} alt="icon-board" /> + Create New Board
              </button>
            )}
          >
            <AddNewBoardForm setOpen={setOpen} />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
}
export default SideMenu;
