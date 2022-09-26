import axios from "axios";
import { toast } from "react-toastify";
import { TOKEN } from "../constants/common";
import { addCollection } from "../redux/actions/collection-actions/add-collection";
import Co from "js-cookie";
import { isValidJSONObject } from "../utils/common-utils";
import { getRequest, postRequest, putRequest } from "../utils/api-utils";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL;
axios.defaults.withCredentials = true;
export const getCredentialsInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL,
    withCredentials: true,
  });
};
const handleResponse = ({ data, status }: any) => {
  if (data) {
    return { code: status, data: data.data };
  }
};

const handleErrorResponse = ({ code, message }: any) => {
  if (code) {
    return { code: code, error: message };
  } else {
    return { code: 500, error: message };
  }
};
const getRequestWithCredentials = async (url: string) => {
  try {
    const res = await getCredentialsInstance().get(url);
    return handleResponse(res);
  } catch (error: any) {
    return handleErrorResponse(error);
  }
};

export async function GetCollection(dispatch: any, page: any, size: any) {
  try {
    await getRequestWithCredentials("/assets/");
    let tempCok: any = Co.get("token") ? Co.get("token") : "";
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "contracts?page=" +
        (page ? page : "") +
        "&size=" +
        (size ? size : ""),
      {},
      dispatch
    );

    dispatch(addCollection(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllCollection(dispatch: any) {
  try {
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "contracts",
      {},
      dispatch
    );

    dispatch(addCollection(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}

export async function PostCreateCollection(
  categoryData: any,
  files: any,
  dispatch: any,
  callback: any
) {
  try {
    const formData = new FormData();
    if (files && files.logoFile) {
      formData.append("logo", files.logoFile);
    }
    if (files && files.bannerFile) {
      formData.append("banner", files.bannerFile);
    }
    if (files && files.feautredFile) {
      formData.append("featured", files.feautredFile);
    }
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);
    formData.append("seasonName", categoryData.seasonName);
    formData.append("assetType", categoryData.assetType);
    formData.append("contractAddress", categoryData.contractAdderss);
    if (categoryData.contractAbi)
      formData.append("contractAbi", categoryData.contractAbi);
    //formData.append("blockNumber", categoryData.blockNumber);
    formData.append("payoutAddress", categoryData.payoutAddres);
    formData.append("sellerFee", categoryData.sellerFee);
    formData.append("categoryId", categoryData.categoryId);
    formData.append("attributes", JSON.stringify(categoryData.attributes));
    formData.append(
      "attributesPanel",
      JSON.stringify(categoryData.attributesPanel)
    );

    const { data } = await postRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "contracts/create",
      formData,
      {},
      dispatch
    );
    if (data.success) {
      toast.success("Collection created successfully !");
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed creating collection.");
    }
    GetCollection(dispatch, categoryData.page, categoryData.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    console.log(error);

    let obj = isValidJSONObject(error.response.data.error.message);

    if (obj) {
      if (Array.isArray(obj)) {
        obj.forEach((val: any) => {
          let errObj: any = JSON.parse(val);
          toast.error(errObj.error);
        });
      } else {
        let errObj: any = JSON.parse(obj);
        toast.error(errObj.error);
      }
    } else {
      toast.error(error.response.data.error.message);
    }
  }
}

export async function PutUpdateCollection(
  categoryId: any,
  files: any,
  categoryData: any,
  dispatch: any,
  callback: any
) {
  const formData = new FormData();
  if (files && files.logoFile) {
    formData.append("logo", files.logoFile);
  }
  if (files && files.bannerFile) {
    formData.append("banner", files.bannerFile);
  }
  if (files && files.feautredFile) {
    formData.append("featured", files.feautredFile);
  }
  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description);
  formData.append("seasonName", categoryData.seasonName);
  formData.append("assetType", categoryData.assetType);
  formData.append("contractAddress", categoryData.contractAdderss);
  if (categoryData.contractAbi)
    formData.append("contractAbi", categoryData.contractAbi);
  //formData.append("blockNumber", categoryData.blockNumber);
  formData.append("payoutAddress", categoryData.payoutAddres);
  formData.append("sellerFee", categoryData.sellerFee);
  formData.append("categoryId", categoryData.categoryId);

  formData.append("attributes", JSON.stringify(categoryData.attributes));
  formData.append(
    "attributesPanel",
    JSON.stringify(categoryData.attributesPanel)
  );

  try {
    const { data } = await putRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "contracts/update/" +
        categoryId,
      formData,
      { "content-type": "multipart/form-data" },
      dispatch
    );

    if (data.success) {
      toast.success("Collection updated successfully !");
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed performing operation.");
    }
    GetCollection(dispatch, categoryData.page, categoryData.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

export async function PutActiveStatus(
  collectionId: any,
  status: any,
  dispatch: any,
  callback: any,
  supportParams: any = {}
) {
  try {
    const { data } = await putRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "contracts/update/" +
        collectionId,
      { isActive: status },
      { "content-type": "multipart/form-data" },
      dispatch
    );

    if (data.success) {
      toast.success(
        data.data.isActive
          ? "Collection marked active."
          : "Collection marked inactive."
      );
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed deleting category.");
    }
    // GetCollection(dispatch, supportParams.page, supportParams.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}
