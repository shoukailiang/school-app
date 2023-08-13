import { useState } from "react";
import { Button, TextArea, Space } from "antd-mobile";
import { useRequest } from "ahooks";
import InfoNav from "@/components/infoNav";
import AvatarSelector from "@/components/avatarSelector";
import {updateUserInfoService} from "@/services/user"
import styles from "./index.module.scss";
import { updateUserReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Bossinfo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [avatar, setAvatar] = useState("");
  const [company, setCompany] = useState("");
  const [money, setMoney] = useState("");

  const handleChange = (key:string, value:string) => {
    if (key === "title") {
      setTitle(value);
    } else if (key === "desc") {
      setDesc(value);
    }else if (key === "company") {
      setCompany(value);
    }else if(key==='money'){
      setMoney(value);
    }
  };
  const handleUpdate = () => {
    updateUserInfo();
  };

  const SelectAvatar = (avatar:string) => {
    setAvatar(avatar);
  }

  const dispatch = useDispatch();
  const nav = useNavigate();


  const { run: updateUserInfo, loading: updateUserInfoLoading } = useRequest(
    async () => {
      const data = await updateUserInfoService( avatar,title, desc);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        dispatch(updateUserReducer(res as any));
        nav("/me");
      },
    }
  );

  return (
    <>
      <InfoNav name="招聘者"></InfoNav>
      <AvatarSelector SelectAvatar={SelectAvatar}></AvatarSelector>
      <div className={styles["info-container"]}>
        <h2 className={styles.header}>请输入你要招聘职位的要求：</h2>
        <TextArea
          placeholder="招聘岗位"
          value={title}
          onChange={(e) => handleChange("title", e)}
        />
        <Space/>
        <TextArea
          placeholder="公司"
          value={company}
          onChange={(e) => handleChange("company", e)}
        />
        <Space/>
        <TextArea
          placeholder="价钱"
          value={money}
          onChange={(e) => handleChange("money", e)}
        />
        <Space/>
        <TextArea placeholder='招聘要求' rows={5}  onChange={(e) => handleChange("desc", e)}/>
        <Button block color="primary" size="large" onClick={handleUpdate} loading={updateUserInfoLoading}>
          保存
        </Button>
      </div>
    </>
  );
};
export default Bossinfo;
