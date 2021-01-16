import { io } from "socket.io-client";
import { getBaseURL } from "./axiosConfig";

const url = getBaseURL();
export const socket = io(url, { forceNew: true });
