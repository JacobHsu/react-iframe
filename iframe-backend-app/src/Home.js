import './App.css';
import IframeComm from "react-iframe-comm";

function App() {
  const mainUrl = "http://localhost:3003/" // npm start frontend first
  const height = document.documentElement.clientHeight
  return (
    <div className="App">
      <IframeComm
      attributes={{
        id: "iframe",
        src: mainUrl,
        position: 'fixed',
        width:'100%',
        top: 'auto',
        height: height,
      }}
      postMessageData={"test99 hello iframe"}
      handleReady={()=>{
        console.log("test99 onReady");
      }}
      />
    </div>
  );
}

export default App;
