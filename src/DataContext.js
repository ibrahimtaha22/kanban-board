import React from "react";
const intialIdCreateContext = crypto.randomUUID();

export const DataContext = React.createContext({
  dataState: [],
  setDataState: () => {},
  open: false,
  setOpen: () => {},
  selectedBoardId: intialIdCreateContext,
  setSelectedBoardId: () => {},
});
