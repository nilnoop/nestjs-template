import { v4 } from "uuid";

export const genTraceId = () => v4().replaceAll("-", "");

export const genSpanId = () => {
  const digits = "0123456789abcdef";
  let n = "";
  for (let i = 0; i < 16; i += 1) {
    const rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
};
