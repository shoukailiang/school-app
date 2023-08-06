import { createBrowserRouter } from 'react-router-dom';
import Bossinfo from '@/page/bossinfo';
import Geniusinfo from '@/page/geniusinfo';
import Login from '@/page/login';
import Register from '../page/register';
import MainLayout from '../layouts/MainLayout';
import PersonCenter from '@/page/personCenter';
import Boss from '@/page/boss';
import Genius from '@/page/genius';
import Msg from '@/components/msg';
import Chat from '../page/chat';


const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        children:[
            {
                path: '/boss',
                element:<Boss/>
            },
            {
                path: '/genius',
                element:<Genius/>
            },
            {
                path: '/msg',
                element:<Msg/>
            },
            {
                path: '/me',
                element:<PersonCenter/>
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
