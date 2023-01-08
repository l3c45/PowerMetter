import About from "./components/About";
import ChartGraph from "./components/ChartGraph";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header  />
      <div
        id={"chart"}
        className="d-flex justify-content-center align-items-center"
      >
        <div className=" w-75 p-3">
          <ChartGraph></ChartGraph>
        </div>
      </div>
      <div id={"about"}className=" container  d-flex  flex-column  justify-content-center align-items-center" >
        <About ></About>
      </div>
    </>
  );
}

export default App;
