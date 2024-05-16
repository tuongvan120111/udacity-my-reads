import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SearchBook from "./pages/SearchBook";
import MyRead from "./pages/MyRead";
import { useState } from "react";
import dispatchLoading, { useLocalStorage } from "./util/loadingState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBook />,
    children: [
      {
        path: "search-book",
        element: <SearchBook />,
      },
    ],
  },
  { path: "my-read", element: <MyRead /> },
]);

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatchLocalStorage: dispatch } = useLocalStorage({
    action: (event) => {
      const isLoading = event.detail.isloading;
      setIsLoading(isLoading);
    },
  });

  dispatchLoading.loadingAction = dispatch;

  return (
    <div className="app">
      {isLoading && (
        <div className="loading-state">
          <div className="loading"></div>
        </div>
      )}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
