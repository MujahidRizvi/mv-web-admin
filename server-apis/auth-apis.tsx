import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_URL, TOKEN } from "../constants/common";
import { addCategories } from "../redux/actions/category-actions/add-categories";
import { isValidJSONObject } from "../utils/common-utils";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export async function GenerateToken() {
  try {
 
    const { data } = await axios.get(
      AUTH_URL +
        "auth/generate-jwt/1"
    );
     // Cookies.remove("token");
    //  Cookies.set('token', data.data.jwtToken);
    //dispatch(addCategories(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}
