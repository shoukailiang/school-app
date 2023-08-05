import { useState } from "react";
import { Image, Space } from "antd-mobile";
import style from "./index.module.scss";
import { FC } from "react";

type PropsType = {
  SelectAvatar: (num: string) => void;
};

type ImageType = {
  icon: string;
  text: string;
};

const AvatarSelector: FC<PropsType> = (prop: PropsType) => {
  const [icon, setIcon] = useState("");
  const [text, setText] = useState("");

  const handleSelect = (value: ImageType) => {
    setIcon(value.icon);
    setText(value.text);
    prop.SelectAvatar(value.text);
  };

  const imgList = [
    "waiter",
    "worker",
    "nurse",
    "robot",
    "technology",
    "police",
    "service",
    "courier",
    "student",
    "grandma",
    "grandpa",
    "national",
    "man",
    "man2",
    "girl",
    "girl2",
    "soldier",
    "doctor",
    "sportsman",
    "criminal",
  ].map((v) => ({
    icon: `https://shoukailiang-blog.oss-cn-hangzhou.aliyuncs.com/article/${v}.png`,
    text: v,
  }));

  const Header = icon ? (
    <div className={style["avatar-selector-header"]}>
      你选择的头像是：
      <img src={icon} alt="" />
    </div>
  ) : (
    <h3>请选择头像</h3>
  );

  return (
    <div>
      <div className={style["header"]}>{Header}</div>
      <Space />
      <div>
        <span className={style["avatar-selector-ImgContainer"]}>
          {imgList.map((value) => (
            <div key={value.text}>
              <Image
                src={value.icon}
                onClick={() => handleSelect(value)}
                width={64}
                height={64}
                fit="cover"
                style={{ borderRadius: 32 }}
              />
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default AvatarSelector;
