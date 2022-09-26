import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  BlueButtonWithText,
  TextInput,
  SelectDropDown,
} from "mv-shared-components/dist";
import MUIButton from "@mui/material/Button";

import { connect, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid-system";
import React, { useEffect, useState } from "react";

import { PutActiveStatus } from "../../server-apis/categories-apis";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { DropzoneDialog } from "material-ui-dropzone";
import Image from "next/image";
import ToggleButton from "../Common/ToggleButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import {ShowDonut} from "../CommonComponents/3DViewer/3Dviewer"
import {
  GetAllCollection,
  GetCollection,
  PostCreateCollection,
  PutUpdateCollection,
} from "../../server-apis/collection-apis";
import {
  GetAssetTypes,
  PostCreateAsset,
  PutUpdateAssets,
} from "../../server-apis/assets-apis";

import dynamic from "next/dynamic";
const Model = dynamic(() => import("../CommonComponents/3DViewer/3Dviewer"), {
  ssr: false,
});

const CssTextField = styled(TextField)({
  margin: "10px 10px",
  borderColor: "white",
  color: "white",
  ":-ms-input-placeholder": { color: "white" },
  width: "100%",
  "::placeholder": { color: "white" },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      color: "white",
    },
  },
});

type AssetsAddProps = {
  onClose: any;
  mode: any;
  details: any;
  asset: any;
  collection: any;
};

const AssetsAdd = ({
  onClose,
  mode,
  details,
  collection,
  asset,
}: AssetsAddProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    GetAllCollection(dispatch);
    GetAssetTypes(dispatch);
  }, []);

  let tempName: any = "";
  let tempDesc: any = "";
  let tempSeasonName: any = "";
  let tempAssetType: any = "-1";

  let tempCollectionId: any = -1;
  let tempAttributes: any = [];
  let tempPrice: any = "";
  let tempOwnerId: any = "N/A";
  let tempAssetLocation: any = "";
  let tempAssetLat: any = "";
  let tempAssetLong: any = "";

  let tempImg: any = "";
  let tempStickerImg: any = "";
  let tempAnimationImg: any = "";

  let tempActive: any = false;

  if (mode && mode == "edit") {
    tempName = details.assetName;
    tempDesc = details.description;

    tempActive = details.isActive;
    tempSeasonName = details.seasonName;
    tempAttributes = details.attributes ? details.attributes : [];
    tempCollectionId = details.contractId;
    tempPrice = details.price;
    tempOwnerId = details.ownerId;
    tempAssetLocation = details.assetLocation;
    tempAssetLat = details.lat;
    tempAssetLong = details.lon;

    tempAssetType = details.assetType;

    tempImg = details.imageName;
    tempStickerImg = details.stickerName;
    tempAnimationImg = details.animationName;
  }
  const [name, setName] = useState(tempName);
  const [description, setDescription] = useState(tempDesc);
  const [collectionId, setCollectionId] = useState(tempCollectionId);
  const [seasonName, setSeasonName] = useState(tempSeasonName);
  const [assetPrice, setAssetPrice] = useState(tempPrice);
  const [assetLocation, setAssetLocation] = useState(tempAssetLocation);
  const [assetLat, setAssetLat] = useState(tempAssetLat);
  const [assetLong, setAssetLong] = useState(tempAssetLong);
  const [attributes, setAttributes] = useState(tempAttributes);
  const [assetType, setAssetType] = useState(tempAssetType);

  const [openImage, setOpenImage] = React.useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(tempImg);
  const [fileImageUpdated, setFileImageUpdated] = useState(false);
  const [previewImage, setPreviewImage] = useState(tempImg);

  const [openSticker, setOpenSticker] = React.useState(false);
  const [selectedStickerFile, setSelectedStickerFile] =
    useState(tempStickerImg);
  const [fileStickerUpdated, setFileStickerUpdated] = useState(false);
  const [previewSticker, setPreviewSticker] = useState(tempStickerImg);

  const [openAnimation, setOpenAnimation] = React.useState(false);
  const [selectedAnimationFile, setSelectedAnimationFile] =
    useState(tempAnimationImg);

  const [fileAnimationUpdated, setFileAnimationUpdated] = useState(false);
  const [previewAnimation, setPreviewAnimation] = useState(tempAnimationImg);

  const [pannelKey, setPannelKey] = useState("");
  const [pannelValue, setPannelValue] = useState("");

  const [isActive, setActive] = useState(tempActive);

  const [addMore, setAddMore] = React.useState(false);

  const resetPage = () => {
    setActive(true);
    setFileAnimationUpdated(false);
    setSelectedAnimationFile("");
    setOpenAnimation(false);
    setPreviewSticker("");
    setFileStickerUpdated(false);
    setSelectedStickerFile("");
    setOpenSticker(false);
    setPreviewImage("");
    setFileImageUpdated(false);
    setSelectedImageFile("");
    setOpenImage(false);
    // setAssetType("-1");
    setAttributes([]);
    setAssetPrice(0.0);
    setSeasonName("");
    // setCollectionId("-1");
    setDescription("");
    setName("");
  };

  const attributesUpdate = (trait_type: any, value: any) => {
    setAttributes((attr: any) =>
      attr.map((obj: any) => {
        if (obj.trait_type == trait_type) {
          return { ...obj, value: value };
        }
        return obj;
      })
    );
  };

  const setAttributesFromCollection = (collectionId: any) => {
    if (collection && collection.results) {
      let attr: any = collection.results.find((x: any) => x.id == collectionId);
      setAttributes(attr.attributes);
    }
  };
  /* if (attributes && attributes.length == 0) {
    setAttributesFromCollection(collectionId);
  }*/

  let categoriesOptions: any = [
    <MenuItem value={-1} key={"-1"}>
      {"-- Select --"}
    </MenuItem>,
  ];
  collection.results?.forEach((val: any) => {
    categoriesOptions.push(
      <MenuItem value={val.id} key={val.id}>
        {val.name}
      </MenuItem>
    );
  });

  let assetTypeOptions: any = [
    <MenuItem value={-1} key={"-11"}>
      {"-- Select --"}
    </MenuItem>,
  ];

  asset?.assetTypes?.forEach((val: any) => {
    assetTypeOptions.push(
      <MenuItem value={val.type} key={val.id}>
        {val.type}
      </MenuItem>
    );
  });
  let attrList: any = [];
  if (attributes && Array.isArray(attributes)) {
    attributes?.forEach((row: any) => {
      attrList.push(
        <TableRow
          key={row.trait_type}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row" style={{ color: "white" }}>
            {row.trait_type}
          </TableCell>
          <TableCell component="th" scope="row" style={{ color: "white" }}>
            <TextInput
              id="key-add"
              label=""
              variant="outlined"
              value={row.value ? row.value : ""}
              onChange={(e: any) => {
                attributesUpdate(row.trait_type, e.target.value);
                // setPannelKey(e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <Box sx={{ color: "white", alignContent: "start" }}>
      <Row>
        {mode == "edit" ? (
          <Col sm={4}>
            {" "}
            <TextInput
              id="asset-id"
              label="id"
              variant="outlined"
              value={details?.id}
              disabled
              onChange={(e: any) => {
                //  setName(e.target.value);
              }}
            />
          </Col>
        ) : (
          ""
        )}
        {mode == "edit" ? (
          <Col sm={4}>
            <TextInput
              id="Owner-Id"
              label="Owner Id"
              variant="outlined"
              value={tempOwnerId}
              disabled
              onChange={(e: any) => {
                //  setName(e.target.value);
              }}
            />
          </Col>
        ) : (
          ""
        )}
        <Col sm={4}>
          <TextInput
            id="asset-name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
        </Col>
        <Col sm={4}>
          <TextInput
            id="asset-season-name"
            label="Season name"
            variant="outlined"
            value={seasonName}
            onChange={(e: any) => {
              setSeasonName(e.target.value);
            }}
          />
        </Col>

        <Col sm={4} style={{ marginTop: "10px" }}>
          <SelectDropDown
            label="Asset types"
            value={assetType}
            onChange={(e: any) => {
              setAssetType(e.target.value);
            }}
            options={assetTypeOptions}
          />
        </Col>

        <Col sm={4}>
          <TextInput
            id="asset-price"
            label="Price"
            variant="outlined"
            value={assetPrice}
            onChange={(e: any) => {
              setAssetPrice(e.target.value);
            }}
          />
        </Col>
        <Col sm={4} style={{ marginTop: "10px" }}>
          <SelectDropDown
            value={collectionId}
            label="Collection"
            onChange={(val: any) => {
              setCollectionId(val.target.value);
              setAttributesFromCollection(val.target.value);
            }}
            options={categoriesOptions}
          />
        </Col>

        <Col sm={12}>
          <TextInput
            rows={3}
            id="asset-description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          />
        </Col>
        {/*<Col sm={12}>
          <InputTextField
            id="asset-location"
            label="Asset location"
            variant="outlined"
            value={assetLocation}
            onChange={(e: any) => {
              setAssetLocation(e.target.value);
            }}
          />
        </Col>
        <Col sm={6}>
          <InputTextField
            id="asset-lat"
            label="Asset Lattitude"
            variant="outlined"
            value={assetLat}
            onChange={(e: any) => {
              setAssetLat(e.target.value);
            }}
          />
        </Col>
        <Col sm={6}>
          <InputTextField
            id="asset-long"
            label="Asset Longitude"
            variant="outlined"
            value={assetLong}
            onChange={(e: any) => {
              setAssetLong(e.target.value);
            }}
          />
          </Col>*/}

        {mode == "edit" ? (
          <Col
            sm={4}
            style={{
              display: "flex",
              marginLeft: "10px",
              flexFlow: "column",
              alignItems: "start",
            }}
          >
            <label style={{ marginBottom: "10px" }}>Active</label>
            <ToggleButton
              checked={isActive}
              onChange={(val: any) => {
                setActive(val);
                PutActiveStatus(details?.id, val, dispatch, () => {
                  GetCollection(dispatch, collection.page + 1, collection.size);
                });
              }}
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
      <div
        style={{
          width: "100%",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <label>Thumbnail image</label>

        <BlueButtonWithText
          btnSize="sm"
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpenImage(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={!selectedImageFile ? "Select image" : "Update image"}
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload thumbnail image"
          open={openImage}
          onClose={() => setOpenImage(false)}
          onSave={(files: any) => {
            setOpenImage(false);
            setSelectedImageFile(files[0]);
            setFileImageUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setPreviewImage(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedImageFile && (
          <img
            src={previewImage}
            width={200}
            height={200}
            style={{ marginTop: "30px", borderRadius: "5px" }}
          />
        )}
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <label>Sticker image</label>

        <BlueButtonWithText
          btnSize="sm"
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpenSticker(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={
            !selectedStickerFile ? "Select image" : "Update sticker image."
          }
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload sticker image."
          open={openSticker}
          onClose={() => setOpenSticker(false)}
          onSave={(files: any) => {
            setOpenSticker(false);
            setSelectedStickerFile(files[0]);
            setFileStickerUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setPreviewSticker(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedStickerFile && (
          <img
            src={previewSticker}
            width={200}
            height={200}
            style={{ marginTop: "30px", borderRadius: "5px" }}
          />
        )}
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <label>3D image</label>

        <BlueButtonWithText
          btnSize="sm"
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpenAnimation(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={!selectedAnimationFile ? "Select image" : "Update 3d image"}
        />

        <DropzoneDialog
          //  acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload animation"
          open={openAnimation}
          onClose={() => setOpenAnimation(false)}
          onSave={(files: any) => {
            setOpenAnimation(false);
            setSelectedAnimationFile(files[0]);

            setFileAnimationUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setPreviewAnimation(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedAnimationFile && (
          <>
            <Model src={previewAnimation} width={200} height={200} />
          </>
        )}
        <Row>
          <Col sm={12} style={{ textAlign: "left" }}>
            <h3>Attributes</h3>
          </Col>

          <Col>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              style={{ color: "white" }}
            >
              <TableHead>
                <TableRow style={{ color: "white" }}>
                  <TableCell style={{ color: "white" }}>Trait type</TableCell>
                  <TableCell style={{ color: "white" }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{attrList}</TableBody>
            </Table>
          </Col>
        </Row>
      </div>
      <div style={{ width: "100%", display: "flex", direction: "rtl" }}>
        <BlueButtonWithText
          btnSize={"sm"}
          sx={{
            margin: "10px",
            backgroundColor: "#48ABDF",
            color: "white",
            padding: "10px 25px",
            borderRadius: "7px",
          }}
          buttonClickHandler={onClose}
          value={"Close"}
        />

        <BlueButtonWithText
          btnSize={"sm"}
          sx={{
            margin: "10px",
            backgroundColor: "#48ABDF",
            color: "white",
            padding: "10px 25px",
            borderRadius: "7px",
          }}
          buttonClickHandler={() => {
            const closeFunction = addMore ? resetPage : onClose;
            mode == "edit"
              ? PutUpdateAssets(
                  details?.id,
                  {
                    imageFile: fileImageUpdated ? selectedImageFile : null,
                    animationFile: fileAnimationUpdated
                      ? selectedAnimationFile
                      : null,
                    stickerFile: fileStickerUpdated
                      ? selectedStickerFile
                      : null,
                  },
                  {
                    assetName: name,
                    description,
                    seasonName,
                    price: parseFloat(assetPrice),
                    contractId: collectionId,
                    attributes,
                    //lat: assetLat,
                    //lon: assetLong,
                    //assetLocation: assetLocation,
                    assetType,
                  },
                  dispatch,
                  closeFunction
                )
              : PostCreateAsset(
                  {
                    assetName: name,
                    description,
                    seasonName,
                    price: parseFloat(assetPrice),
                    contractId: collectionId,
                    attributes,
                    //lat: assetLat,
                    //lon: assetLong,
                    //assetLocation: assetLocation,
                    assetType,
                  },
                  {
                    imageFile: selectedImageFile,
                    annimationFile: selectedAnimationFile,
                    stickerFile: selectedStickerFile,
                  },
                  dispatch,
                  closeFunction
                );
          }}
          value={"Save"}
        />
        {mode != "edit" ? (
          <div style={{ padding: "10px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={addMore}
                  onChange={(e: any) => {
                    setAddMore(e.target.checked);
                  }}
                />
              }
              label="Add More"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  asset: {
    results: state.asset?.results,
    page: state.asset?.page,
    size: state.asset?.size,
    total: state.asset?.total,
    assetTypes: state.asset?.assetTypes,
  },
  collection: {
    results: state.collection?.results,
    page: state.collection?.page,
    size: state.collection?.size,
    total: state.collection?.total,
  },
});

export default connect(mapStateToProps)(AssetsAdd);
