import App from "./App";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Category from "./components/Category";
import ErrorPage from "./components/ErrorPage";
import ShopIndex from "./components/ShopIndex";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart/", element: <Cart /> },
      {
        path: "shop/",
        element: <Shop />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <ShopIndex /> },
          { path: "categories/:category/:pg", element: <Category /> },
          { path: "search/:query/:pg", element: <Category /> },
          { path: "product/:productId", element: <Product /> },
        ]
      },
    ],
  },
];

export default routes;