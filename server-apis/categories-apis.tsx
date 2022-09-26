import axios from "axios";
import { toast } from "react-toastify";
import { TOKEN } from "../constants/common";
import { addCategories } from "../redux/actions/category-actions/add-categories";
import { disableSpinner } from "../redux/actions/spinner-actions/disable-spinner";
import { enableSpinner } from "../redux/actions/spinner-actions/enable-spinner";
import { getRequest, postRequest, putRequest } from "../utils/api-utils";
import { isValidJSONObject } from "../utils/common-utils";

axios.defaults.withCredentials = true;

export async function GetCategories(dispatch: any, page: any, size: any) {
  try {
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "categories?page=" +
        (page ? page : "") +
        "&size=" +
        (size ? size : ""),
      {},
      dispatch
    );

    dispatch(addCategories(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllCategories(dispatch: any) {
  try {
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "categories",
      {},
      dispatch
    );

    dispatch(addCategories(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}

export async function PostCreateCategories(
  categoryData: any,
  logofile: any,
  dispatch: any,
  callback: any
) {
  try {
    const formData = new FormData();
    formData.append("logo", logofile);
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);
    const { data } = await postRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "categories/create",
      formData,
      {},
      dispatch
    );
    if (data.success) {
      toast.success("Category created successfully !");
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed creating category.");
    }
    GetCategories(dispatch, categoryData.page, categoryData.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    console.log(error);

    let obj = isValidJSONObject(error.response.data.error.message);

    if (obj) {
      obj.forEach((val: any) => {
        let errObj: any = JSON.parse(val);
        toast.error(errObj.error);
      });
    } else {
      toast.error(error.response.data.error.message);
    }
  }
}

export async function PutUpdateCategories(
  categoryId: any,
  logoFile: any,
  categoryData: any,
  dispatch: any,
  callback: any
) {
  const formData = new FormData();
  if (logoFile) {
    formData.append("logo", logoFile);
  }
  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description);

  try {
    const { data } = await putRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "categories/update/" +
        categoryId,
      formData,
      {},
      dispatch
    );

    if (data.success) {
      toast.success(
        categoryData.isActive == false
          ? "Category delete successfully !"
          : "Category updated successfully !"
      );
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed deleting category.");
    }
    GetCategories(dispatch, categoryData.page, categoryData.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

export async function PutActiveStatus(
  categoryId: any,
  status: any,
  dispatch: any,
  callback: any
) {
  try {
    const { data } = await putRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "categories/changeActiveStatus/" +
        categoryId,
      { status: status },
      {},
      dispatch
    );

    if (data.success) {
      toast.success(
        data.data.isActive
          ? "Category marked active."
          : "Category marked inactive."
      );
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed deleting category.");
    }
    GetCategories(dispatch, data.page, data.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}
