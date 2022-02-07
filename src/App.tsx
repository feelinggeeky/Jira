import React from "react";
import "./App.css";
// @ts-ignore
import { ProjectListScreen } from "./screens/project-list";
import { TsReactTest } from "./screens/project-list/try-use-array";
import { LoginScreen } from "./screens/login";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*<ProjectListScreen />*/}
      {/*<TsReactTest />*/}
      {/*<LoginScreen />*/}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
