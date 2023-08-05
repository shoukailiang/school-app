import { Button, Card, Toast } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
type propsType = {
  userList: any[];
};
const UserCard: FC<propsType> = (props: propsType) => {
  const nav = useNavigate();
  const onBodyClick = () => {};
  const onHeaderClick = () => {};
  return (
    <div className={styles.container}>
      {props?.userList?.map((item) => {
        return item.avatar ? (
          <Card
            key={item._id}
            className={styles.card}
            title={
              <div style={{ fontWeight: "normal" }}>
                <AntOutline style={{ marginRight: "4px", color: "#1677ff" }} />
                {item.title}
              </div>
            }
            extra={<RightOutline />}
            onBodyClick={onBodyClick}
            onHeaderClick={onHeaderClick}
            style={{ borderRadius: "16px" }}
          >
            <div className={styles.content}>
              <p>{item.user}</p>
              {item.company ? <div>地点: {item.company}</div> : null}
              {/* 若有换行符，进行一行一行显示 */}
              <b>{item.type === "boss" ? "要求：" : "个人介绍"}</b>
              {item.desc.split("\n").map((v: string, index: number) => {
                return <p key={v + index}>{v}</p>;
              })}
              {item.money ? <div>薪资: {item.money}</div> : null}
            </div>
            <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
              <Button
                color="primary"
                onClick={() => {
                   nav(`/chat/${item._id}`);
                }}
              >
                联系ta
              </Button>
            </div>
          </Card>
        ) : null;
      })}
    </div>
  );
};

export default UserCard;
