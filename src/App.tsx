import React from "react";
import "./App.css";
// @ts-ignore
import { ProjectListScreen } from "./screens/project-list";
import { TsReactTest } from "./screens/project-list/try-use-array";

function App() {
  return (
    <div className="App">
      {/*<ProjectListScreen />*/}
      <TsReactTest />
    </div>
  );
}

export default App;
