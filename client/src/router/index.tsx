import { createBrowserRouter } from 'react-router-dom';
import Bossinfo from '@/page/bossinfo';
import Geniusinfo from '@/page/geniusinfo';
import Login from '@/page/login';
import Register from '../page/register';
import Chat from '../page/chat';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        children:[
            // {
            //     path: '/boss',
            //     element:<Bossinfo/>
            // },
            // {
            //     path: '/genius',
            //     element:<Geniusinfo/>
            // },
            {
                path: '/msg',
                element:<Chat/>
            },
            {
                path: '/me',
                element:<Chat/>
            },

            {
                path: '/chat/:user',
                element:<Chat/>
            },
        ]
    },
    {
        path: '/login',
        element:<Login/>,
    },
    {
        path:"/register",
        element:<Register/>,
    },
    {
        path: '/bossinfo',
        element:<Bossinfo/>
    },
    {
        path: '/geniusinfo',
        element:<Geniusinfo/>
    },
])

export default router;
