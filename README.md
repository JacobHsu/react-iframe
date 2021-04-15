# react-iframe

[window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

子傳父

iframe-frontend-app\src\App.js 子

```js
  useEffect(
    () => {
      window.parent.postMessage({method:"getAddress", data:"子傳父"}, '*');
    },[]
  )
```

iframe-backend-app\src\Home.js 父
> handleReceiveMessage()收

```js
const mainUrl = "http://localhost:3003/" // frontend 
<IframeComm
    attributes={{
    id: "iframe",
    src: mainUrl,
    handleReceiveMessage={(event)=>{
        if (event.data.method) {
          var iframe = document.getElementById('iframe').contentWindow

          console.log("[backend] handleReceiveMessage "+JSON.stringify(event.data)) // 接收子的參數

          switch (event.data.method) {
            case "getAddress":
              console.log('parent getAddress:', event.data.data) // parent getAddress: 子傳父
              break
          }
        }
    }}
```

父傳子

iframe-backend-app\src\Home.js 父

```js
 <IframeComm
      attributes={{
        id: "iframe",

      }}
      handleReceiveMessage={(event)=>{
        if (event.data.method) {
          var iframe = document.getElementById('iframe').contentWindow
           iframe.postMessage({method:"returnAddress", data:"父傳子"}, '*');
          }
        }
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
