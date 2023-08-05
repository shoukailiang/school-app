import { useState } from "react";
import { Button, TextArea, Space } from "antd-mobile";
import { useRequest } from "ahooks";
import InfoNav from "@/components/infoNav";
import AvatarSelector from "@/components/avatarSelector";
import { updateUserInfoService } from "@/services/user";
import styles from "./index.module.scss";
import { updateUserReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    updateUserInfo();
  };

  const SelectAvatar = (avatar: string) => {
    setAvatar(avatar);
  };

  const dispatch = useDispatch();
  const nav = useNavigate();

  const { run: updateUserInfo, loading: updateUserInfoLoading } = useRequest(
    async () => {
      const data = await updateUserInfoService(avatar,title, desc);
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(updateUserReducer(res as any));
        nav("/me");
      },
    }
  );

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
        <Space />
        <TextArea
          placeholder="请输入个人介绍"
          rows={5}
          onChange={(e) => handleChange("desc", e)}
        />
        <Button
          block
          color="primary"
          size="large"
          onClick={handleUpdate}
          loading={updateUserInfoLoading}
        >
          保存
        </Button>
      </div>
    </>
  );
};
export default Geniusinfo;
