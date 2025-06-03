import axios from "axios";
import BACKEND_URLS from "../utils/urls";


export const instance = axios.create({
  baseURL: BACKEND_URLS.baseURl,
});

export const BASEURL = BACKEND_URLS.baseURl;
