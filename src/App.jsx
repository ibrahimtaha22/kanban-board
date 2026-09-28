import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import WorkSpace from "@/components/Workspace";
import DataContextProvider from "@/DataContext.jsx";
function App() {
  return (
    <div className="font-jakarta flex h-full flex-col">
      <DataContextProvider>
        <Header />
        <div className="flex h-full flex-1">
          <SideMenu />
          <WorkSpace />
        </div>
      </DataContextProvider>
    </div>
  );
}

export default App;
