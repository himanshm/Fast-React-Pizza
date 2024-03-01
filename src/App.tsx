import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Root.tsx';

const router = createBrowserRouter(Root);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
