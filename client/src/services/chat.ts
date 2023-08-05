import store from "@/store";
import axios, { DataType } from "./axios";
import io from 'socket.io-client'
// 由于跨域了所以要写上端口
export const socket = io("ws://127.0.0.1:9999")


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


export  function recvMsgService(): any {
    socket.on('recvmsg', (data: any) => {
      store.dispatch({ type: 'msgRecvReducer', payload: {data,userid: store.getState().user._id} })
  })
}

export function sendMsgService({ from, to, msg }: any): any {
  socket.emit('sendmsg', { from, to, msg })
}