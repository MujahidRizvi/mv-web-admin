import axios from "axios";
import { toast } from "react-toastify";
import { TOKEN } from "../constants/common";
import { addAssets } from "../redux/actions/assets-actions/add-assets";
import { getAssetTypes } from "../redux/actions/assets-actions/add-assets-types";
import { disableSpinner } from "../redux/actions/spinner-actions/disable-spinner";
import { enableSpinner } from "../redux/actions/spinner-actions/enable-spinner";
import { getRequest, postRequest, putRequest } from "../utils/api-utils";

import { isValidJSONObject } from "../utils/common-utils";

axios.defaults.withCredentials = true;

export async function GetAssets(dispatch: any, page: any, size: any) {
  try {
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL +
        "assets/?page=" +
        (page ? page : "") +
        "&size=" +
        (size ? size : ""),
      {},
      dispatch
    );

    dispatch(addAssets(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error, "Asset Error");
  }
}
export async function GetAssetTypes(dispatch: any) {
  try {
    const { data } = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "assets/types",
      {},
      dispatch
    );

    dispatch(getAssetTypes(data && data.data ? data.data : {}));
  } catch (error) {
    console.log(error);
  }
}

export async function PostCreateAsset(
  bodyData: any,
  files: any,
  dispatch: any,
  callback: any
) {
  try {
    const formData = new FormData();
    if (files && files.imageFile) {
      formData.append("image", files.imageFile);
    }
    if (files && files.bannerFile) {
      formData.append("sticker", files.bannerFile);
    }
    if (files && files.animationFile) {
      formData.append("animation", files.animationFile);
    }
    formData.append("assetName", bodyData.assetName);
    formData.append("description", bodyData.description);
    formData.append("seasonName", bodyData.seasonName);
    formData.append("assetStatus", "1");
    formData.append("assetType", bodyData.assetType);
    formData.append("contractId", bodyData.contractId);
    formData.append("price", bodyData.price);
    formData.append("attributes", JSON.stringify(bodyData.attributes));
    //formData.append("lon", bodyData.lon);
    //formData.append("assetLocation", bodyData.assetLocation);

    const { data } = await postRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "assets/create",
      formData,
      {
        "content-type": "multipart/form-data",
      },
      dispatch
    );
    if (data.success) {
      toast.success("Asset created successfully !");
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed performing action.");
    }
    GetAssets(dispatch, data.page, data.size);
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

export async function PutUpdateAssets(
  assetId: any,
  files: any,
  bodyData: any,
  dispatch: any,
  callback: any
) {
  const formData = new FormData();
  if (files && files.imageFile) {
    formData.append("image", files.imageFile);
  }
  if (files && files.stickerFile) {
    formData.append("sticker", files.stickerFile);
  }
  if (files && files.animationFile) {
    formData.append("animation", files.animationFile);
  }
  formData.append("assetName", bodyData.assetName);
  formData.append("description", bodyData.description);
  formData.append("seasonName", bodyData.seasonName);
  formData.append("assetType", bodyData.assetType);
  formData.append("contractId", bodyData.contractId);
  formData.append("price", bodyData.price);
  formData.append("attributes", JSON.stringify(bodyData.attributes));
  //formData.append("lat", bodyData.lat);
  //formData.append("lon", bodyData.lon);
  //formData.append("assetLocation", bodyData.assetLocation);

  try {
    const { data } = await putRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "assets/update/" + assetId,
      formData,
      {
        "content-type": "multipart/form-data",
      },
      dispatch
    );

    if (data.success) {
      toast.success("Assets updated successfully !");
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed performing operation.");
    }
    GetAssets(dispatch, data.page, data.size);
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
        "assets/update/" +
        collectionId,
      { isActive: status },
      {},
      dispatch
    );

    if (data.success) {
      toast.success(
        data.data.isActive ? "Asset marked active." : "Asset marked inactive."
      );
      if (callback) {
        callback();
      }
    } else {
      toast.error("Failed performing operation.");
    }
    // GetCollection(dispatch, supportParams.page, supportParams.size);
    //dispatch(addCategories(data.data));
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

export async function PostAssetImport(
  dataBody: any,
  attachmentFile: any,
  dispatch: any
) {
  try {
    const formData = new FormData();
    if (attachmentFile) {
      formData.append("attachmentZip", attachmentFile);
    }

    formData.append("features", JSON.stringify(dataBody.features));
    formData.append("contractId", dataBody.contractId);
    formData.append("assetType", dataBody.assetType);

    let data: any = await postRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "assets/import",
      formData,
      {
        "content-type": "multipart/form-data",
      },
      dispatch
    );
    if (data.data.success) {
      toast.success("Assets imported successfully !");
      console.log(data.data);
      let errRpt="";
      let failedAssets:any=[];
      data.data.data.errors?.forEach((val:any)=>{
        errRpt+=JSON.stringify(val.data)+"   |   "+val.errorMessage+"\n";
        failedAssets.push(val.data);
      })

      const rptelement = document.createElement("a"); 
      const rptFile = new Blob([errRpt], {
        type: "text/plain",
      });
      rptelement.href = URL.createObjectURL(rptFile);
      rptelement.download = "Error-repor.txt";
      document.body.appendChild(rptelement);
      rptelement.click();


      const element = document.createElement("a");
      
      const file = new Blob([JSON.stringify(failedAssets)], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Failedassets.json";
      document.body.appendChild(element);
      element.click();
    } else {
      toast.error("Failed performing operation.");
    }
    // dispatch(GetAssets(dispatch, supportingData.page, supportingData.size));
  } catch (error) {
    toast.error("Failed performing operation.");
    console.log(error);
  }
}

export async function GetAssetExport(dispatch: any,assetType:any="Lands") {
  try {
    let data: any = await getRequest(
      process.env.NEXT_PUBLIC_OBJECT_SERVICE_URL + "assets/export?assetType="+assetType,
      {},
      dispatch
    );
    if (data.data.success) {
      const element = document.createElement("a");

      const file = new Blob([JSON.stringify(data.data.data)], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "assets.json";
      document.body.appendChild(element);
      element.click();
      toast.success("Data exported successfully.");
    } else {
      toast.error("Failed performing operation.");
    }
    // dispatch(GetAssets(dispatch, supportingData.page, supportingData.size));
  } catch (error) {
    toast.error("Failed performing operation.");
    console.log(error);
  }
}
