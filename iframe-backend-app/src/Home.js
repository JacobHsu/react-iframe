import './App.css';
import IframeComm from "react-iframe-comm";
import { isValidAddress } from './Validate'

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
      postMessageData={"test hello iframe"}
      handleReady={()=>{
        console.log("[backend] IframeComm handleReady");
      }}
      handleReceiveMessage={(event)=>{
        if (event.data.method) {
          var iframe = document.getElementById('iframe').contentWindow

          console.log("[backend] handleReceiveMessage "+JSON.stringify(event.data)) // 接收子的參數

          switch (event.data.method) {
            case "getAddress":
              console.log('parent getAddress', event.data.data)
              const poaAddress = localStorage.getItem('poaAddress')
              if (poaAddress && isValidAddress(poaAddress)) {
                iframe.postMessage({method:"returnAddress", data:poaAddress}, '*');
              } else {
                iframe.postMessage({method:"returnAddress", data:"父傳子"}, '*');
              }
              break
          }
        }
      }}
      />
    </div>
  );
}

export default App;
