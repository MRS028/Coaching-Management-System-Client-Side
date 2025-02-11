import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Home/Home/HomeLayout";
import Home from "../Home/HomeMain/Home";
import Courses from "../Pages/Courses/Courses";
import AuthLayOut from "../Components/Auth/AuthLayOut/AuthLayOut";
import Login from "../Components/Auth/LoginPage/Login";
import SignUp from "../Components/Auth/SignUp/SignUp";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
        {
            path : '/',
            element: <Home/>
        },
        {
            path : '/courses',
            element: <Courses/>
        },
        {
            path:"",
            element: <AuthLayOut/>,
            children: [
                {
                    path: "/auth/login",
                    element: <Login/>
                },
                {
                    path: "/auth/signup",
                    element: <SignUp/>
                }
            ]
        }
    ]
  },
  {
    path: "/*",
    element: <div>Error</div>,
  },
]);
export default Router;

