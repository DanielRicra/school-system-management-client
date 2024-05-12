import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "./components/providers/theme-provider";
import { router } from "./router";
import "./app.css";

function InnerApp() {
  const auth = { firstName: "Daniel", id: "123654-456" };
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <InnerApp />
    </ThemeProvider>
  );
}

export default App;
