import store from "@/store";
import axios, { DataType } from "./axios";
import io from "socket.io-client";
// 由于跨域了所以要写上端口
const socket = io("ws://127.0.0.1:9999");

// readMsg
export async function readMsgService(from: string): Promise<DataType> {
  const url = `/api/readmsg`;
  const data = (await axios.post(url, {
    from,
  })) as DataType;
  return data;
}

// getMessageList
export async function getMessageListService(): Promise<DataType> {
  const data = (await axios.get("/api/getmsglist")) as DataType;
  return data;
}

// todo 总感觉不是这样写的，但是不加防抖的话，会导致多次触发
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
let debouncedRecvMsgHandler;
export function recvMsgService(): any {
  if (!debouncedRecvMsgHandler) {
    debouncedRecvMsgHandler = debounce((data) => {
      const userid = store.getState().user._id;
      store.dispatch({
        type: "chat/msgRecvReducer",
        payload: { data, userid },
      });
    }, 300); // 设置防抖延迟时间，单位毫秒
  }

  socket.on("recvmsg", debouncedRecvMsgHandler);
}

export function sendMsgService({ from, to, msg }: any): any {
  socket.emit("sendmsg", { from, to, msg });
}
