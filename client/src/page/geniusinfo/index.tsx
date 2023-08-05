import { useState } from "react";
import { Button, TextArea, Space } from "antd-mobile";
import InfoNav from "@/components/infoNav";
import AvatarSelector from "@/components/avatarSelector";
import styles from "./index.module.scss";
const Geniusinfo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleChange = (key, value) => {
    if (key === "title") {
      setTitle(value);
    } else if (key === "desc") {
      setDesc(value);
    }
  };
  const handleUpdate = () => {
    console.log({title, desc, avatar})
    // update({ title, desc, avatar });
  };

  const SelectAvatar = (avatar:string) => {
    setAvatar(avatar);
  }

  return (
    <>
      <InfoNav name="求职者"></InfoNav>
      <AvatarSelector SelectAvatar={SelectAvatar}></AvatarSelector>
      <div className={styles["info-container"]}>
        <h2 className={styles.header}>请输入您的信息：</h2>
        <TextArea
          placeholder="请输入招聘岗位"
          value={title}
          onChange={(e) => handleChange("title", e)}
        />
        <Space/>
         <TextArea placeholder='请输入个人介绍' rows={5}  onChange={(e) => handleChange("desc", e)}/>
        <Button block color="primary" size="large" onClick={handleUpdate}>
          保存
        </Button>
      </div>
    </>
  );
};
export default Geniusinfo;
