import React from "react";
import "./App.css";
import {Route} from "react-router-dom";
// import { Button, ButtonGroup } from "@chakra-ui/react";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/ChatPage";
function App() {
  return (
    <div className="App">
      
        <Route path="/" component={Homepage} exact/>
        <Route path="/chats" component={Chatpage} />
     
    </div>
  );
}

export default App;
// function App() {
//   return <h1>Hello World</h1>;
// }

// export default App;