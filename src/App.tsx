import React from "react";
import "./App.css";
// @ts-ignore
import { ProjectListScreen } from "./screens/project-list";
import { TsReactTest } from "./screens/project-list/try-use-array";
import { LoginScreen } from "./screens/login";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

const AuthenticatedApp = React.lazy(() => import("authenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*<ProjectListScreen />*/}
      {/*<TsReactTest />*/}
      {/*<LoginScreen />*/}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
