import axios from "axios";
import { disableSpinner } from "../redux/actions/spinner-actions/disable-spinner";
import { enableSpinner } from "../redux/actions/spinner-actions/enable-spinner";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_SERVICE_URL,
});

export async function getRequest(url: any, headers: any = {}, disptach: any) {
  if (disptach) {
    disptach(enableSpinner());
  }
  try {
    var resp = await instance.get(url, {
      headers: headers,
      withCredentials: true,
    });
  } catch (ex) {
    if (disptach) {
      disptach(disableSpinner());
    }
    throw ex;
  }
  if (disptach) {
    disptach(disableSpinner());
  }
  return resp;
}

export async function postRequest(
  url: any,
  body: any = {},
  headers: any = {},
  disptach: any
) {
  if (disptach) {
    disptach(enableSpinner());
  }
  try {
    var resp = await instance.post(url, body, {
      headers: headers,
      withCredentials: true,
    });
  } catch (ex) {
    if (disptach) {
      disptach(disableSpinner());
    }
    throw ex;
  }
  if (disptach) {
    disptach(disableSpinner());
  }
  return resp;
}
export async function putRequest(
  url: any,
  body: any = {},
  headers: any = {},
  disptach: any
) {
  if (disptach) {
    disptach(enableSpinner());
  }
  try {
    var resp = await instance.put(url, body, {
      headers: headers,
      withCredentials: true,
    });
  } catch (ex) {
    if (disptach) {
      disptach(disableSpinner());
    }
    throw ex;
  }
  if (disptach) {
    disptach(disableSpinner());
  }
  return resp;
}
