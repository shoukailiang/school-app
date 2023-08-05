import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
  } from "antd-mobile-icons";
  
const tabs = [
    {
      key: "/boss",
      title: "牛人",
      icon: <AppOutline />,
    },
    {
      key: "/genius",
      title: "天才",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/msg",
      title: "消息",
      icon: <MessageOutline />,
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

export default tabs;