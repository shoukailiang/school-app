import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
  } from "antd-mobile-icons";
  
const tabs = [
    {
      key: "/boss",
      title: "老板",
      icon: <AppOutline />,
    },
    {
      key: "/genius",
      title: "求职者",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/msg",
      title: "消息",
      icon: <MessageOutline />,
      badge: '0',
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

export default tabs;