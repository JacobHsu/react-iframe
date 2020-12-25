# react-iframe


iframe-frontend-app\src\App.js 子

```js
  useEffect(
    () => {
      window.parent.postMessage({method:"getWallet", data:""}, '*');
    },[]
  )
```

iframe-backend-app\src\Home.js 父

```js
const mainUrl = "http://localhost:3003/" // frontend 
<IframeComm
    attributes={{
    id: "iframe",
    src: mainUrl,
    handleReceiveMessage={(event)=>{
    if (event.data.method) {
        var iframe = document.getElementById('iframe').contentWindow

        console.log("[backend] handleReceiveMessage "+JSON.stringify(event.data))
        // [backend] handleReceiveMessage {"method":"getWallet","data":""}

        iframe.postMessage({method:"returnAddress", data:"EMPTY"}, '*');
    }
    }}
```

iframe-frontend-app\src\App.js 子

```js
  useEffect(
    () => {
      window.addEventListener('message', (event)=>{
        if (event.data.method) {
          console.log("[front] addEventListener "+JSON.stringify(event.data))

          switch (event.data.method) {
            case "returnAddress":
              if (event.data.data == "EMPTY") {
                console.log("[front] returnAddress "+JSON.stringify(event.data))
              }
              break
          }
        }
      }, false);
```
