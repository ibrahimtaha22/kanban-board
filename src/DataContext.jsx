import { useEffect, useState } from "react";
import { DataContext } from "./DataContext.js";
import { getCachingData } from "./utils.js";
function DataContextProvider({ children }) {
  const [dataState, setDataState] = useState(() => getCachingData("data"));

  const [selectedBoardId, setSelectedBoardId] = useState(() => {
    const cachedData = getCachingData("data");
    return cachedData[0]?.id ?? null;
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);
  return (
    <DataContext.Provider
      value={{
        dataState,
        setDataState,
        open,
        setOpen,
        selectedBoardId,
        setSelectedBoardId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
