import axios, { DataType } from "./axios";

// 用户登陆
export async function loginService(
  username: string,
  password: string
): Promise<DataType> {
  const url = `/api/login`;
  const data = (await axios.post(url, {
    user: username,
    pwd: password,
  })) as DataType;
  return data;
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  type:string
): Promise<DataType> {
  const url = `/api/register`;
  const data = (await axios.post(url, {
    user:username,
    pwd:password,
    type
  })) as DataType;
  return data;
}
// 获取用户信息
export async function getUserInfoService(): Promise<DataType> {
  const url = `/api/info`;
  const data = (await axios.get(url)) as DataType;
  return data;
}

// 更新用户信息
export async function updateUserInfoService(
  avatar: string,
  title: string,
  desc: string,
  company?: string,
  money?: string
): Promise<DataType> {
  const url = `/api/update`;
  const data = (await axios.post(url, {
    avatar,
    title,
    desc,
    company,
    money,
  })) as DataType;
  return data;
}
