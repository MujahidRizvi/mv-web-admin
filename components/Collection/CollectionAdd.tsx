import type { NextPage } from "next";
import Box from "@mui/material/Box";

import {
  BlueButtonWithText,
  TextInput,
  SelectDropDown,
} from "mv-shared-components/dist";

import { connect, useDispatch } from "react-redux";
import { Row, Col } from "react-grid-system";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  GetAllCategories,
  GetCategories,
  PostCreateCategories,
  PutActiveStatus,
  PutUpdateCategories,
} from "../../server-apis/categories-apis";
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
import {
  GetCollection,
  PostCreateCollection,
  PutUpdateCollection,
} from "../../server-apis/collection-apis";

import { GetAssetTypes } from "../../server-apis/assets-apis";
import MUIButton from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

type CollectionAddProps = {
  onClose: any;
  mode: any;
  details: any;
  categories: any;
  collection: any;
  assetTypes: any;
};

const CollectionAdd = ({
  onClose,
  mode,
  details,
  categories,
  collection,
  assetTypes,
}: CollectionAddProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    GetAllCategories(dispatch);
    GetAssetTypes(dispatch);
  }, []);

  let tempName: any = "";
  let tempDesc: any = "";
  let tempSeasonName: any = "";
  let tempAssetType: any = "";
  let tempContractAddress: any = "";
  let tempContractAbi: any = "";
  let tempBlockNumber: any = "";
  let tempCategoryId: any = -1;
  let tempAttributes: any = [];
  let tempPannelAttributes: any = [];
  let tempPayoutAddress: any = "";
  let tempSellerFees: any = "";

  let tempLogoImg: any = "";
  let tempFeatuerdImg: any = "";
  let tempBannerImg: any = "";

  let tempActive: any = false;

  if (mode && mode == "edit") {
    tempName = details.name;
    tempDesc = details.description;
    tempLogoImg = details.logoImage;
    tempFeatuerdImg = details.featuredImage;
    tempBannerImg = details.bannerImage;
    tempActive = details.isActive;
    tempSeasonName = details.seasonName;
    tempPannelAttributes = details.attributesPannel
      ? JSON.parse(details.attributesPannel)
      : [];

    tempAttributes = details.attributes ? details.attributes : [];
    tempCategoryId = details.categoryId;
    tempPayoutAddress = details.payoutAddress;
    tempAssetType = details.assetType;
    tempBlockNumber = details.blockNumber;
    tempContractAbi = details.contractAbi;

    tempContractAddress = details.contractAddress;
    tempSellerFees = details.sellerFee;
  }
  const [name, setName] = useState(tempName);
  const [description, setDescription] = useState(tempDesc);
  const [category, setCategory] = useState(tempCategoryId);
  const [blockNumber, setBlockNumber] = useState(tempBlockNumber);
  const [seasonName, setSeasonName] = useState(tempSeasonName);
  const [assetType, setAssetType] = useState(tempAssetType);
  const [contractAdderss, setContractAddress] = useState(tempAssetType);
  const [contractAbi, setContractAbi] = useState(tempContractAbi);
  const [payoutAddres, setPayoutAddress] = useState(tempPayoutAddress);
  const [sellerFees, setSellerFees] = useState(tempSellerFees);
  const [attributes, setAttributes] = useState(
    tempAttributes ? tempAttributes : []
  );
  const [attributesPanel, setAttributesPanel] = useState(
    tempPannelAttributes ? tempPannelAttributes : []
  );

  const [openContractAbi, setOpenContractAbi] = React.useState(false);
  const [selectedAbiFile, setSelectedAbiFile] = useState(tempContractAbi);
  const [fileAbiUpdated, setFileAbiUpdated] = useState(false);

  const [openLogo, setOpenLogo] = React.useState(false);
  const [selectedLogoFile, setSelectedLogoFile] = useState(tempLogoImg);
  const [fileLogoUpdated, setFileLogoUpdated] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(tempLogoImg);

  const [openFeatuerd, setOpenFeatuerd] = React.useState(false);
  const [selectedFeatuerdFile, setSelectedFeatuerdFile] =
    useState(tempFeatuerdImg);
  const [fileFeatuerdUpdated, setFeatuerdUpdated] = useState(false);
  const [previewFeatuerd, setFeatuerdPreview] = useState(tempFeatuerdImg);

  const [openBanner, setOpenBanner] = React.useState(false);
  const [selectedBannerFile, setSelectedBannerFile] = useState(tempBannerImg);
  const [fileBannerUpdated, setFileBannerUpdated] = useState(false);
  const [previewBanner, setBannerPreview] = useState(tempBannerImg);

  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");

  const [pannelKey, setPannelKey] = useState("");
  const [pannelValue, setPannelValue] = useState("");

  const [isActive, setActive] = useState(tempActive);
  const attributesUpdate = (e: any) => {
    if (attrKey) {
      setAttributes([...attributes, { trait_type: attrKey }]);
    }
  };
  let categoriesOptions: any = [
    <MenuItem value={-1} key={"-1"}>
      {"-- Select --"}
    </MenuItem>,
  ];
  let assetTypesOptions: any = [
    <MenuItem value={-1} key={"-11"}>
      {"-- Select --"}
    </MenuItem>,
  ];
  categories.results?.forEach((val: any) => {
    categoriesOptions.push(
      <MenuItem value={val.id} key={val.id}>
        {val.name}
      </MenuItem>
    );
  });
  assetTypes?.forEach((val: any) => {
    assetTypesOptions.push(
      <MenuItem value={val.type} key={val.id}>
        {val.type}
      </MenuItem>
    );
  });

  let attrList: any = [];
  console.log("update ");
  if (attributes && Array.isArray(attributes)) {
    console.log("update 1");
    attributes?.forEach((row: any) => {
      attrList.push(
        <TableRow
          key={row.trait_type}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row" style={{ color: "white" }}>
            {row.trait_type}
          </TableCell>
          {/*<TableCell component="th" scope="row" style={{ color: "white" }}>
            {row.value}
      </TableCell>*/}
          <TableCell style={{ color: "white" }}>
            <MUIButton
              onClick={() => {
                let attrList = attributes.filter(
                  (val: any) => val.trait_type != row.trait_type
                );
                setAttributes(attrList);
              }}
            >
              Remove
            </MUIButton>{" "}
          </TableCell>
        </TableRow>
      );
    });
  }

  //let pannelAttrList: any = [];

  /*if (attributesPanel) {
    attributesPanel?.forEach((row: any) => {
      pannelAttrList.push(
        <TableRow
          key={row.trait_type}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row" style={{ color: "white" }}>
            {row.trait_type}
          </TableCell>
          <TableCell component="th" scope="row" style={{ color: "white" }}>
            {row.value}
          </TableCell>
          <TableCell style={{ color: "white" }}>
            <MUIButton
              onClick={() => {
                let attrList = attributesPanel.filter(
                  (val: any) => val.trait_type != row.trait_type
                );
                setAttributesPanel(attrList);
              }}
            >
              Remove
            </MUIButton>{" "}
          </TableCell>
        </TableRow>
      );
    });
  }*/

  return (
    <Box sx={{ color: "white", alignContent: "start" }}>
      <Row>
        {mode == "edit" ? (
          <Col sm={4}>
            {" "}
            <TextInput
              id="category-name"
              label="Name"
              variant="outlined"
              value={details?.id}
              disabled
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Col>
        ) : (
          ""
        )}
        <Col sm={4}>
          <TextInput
            id="collection-name"
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
            id="collection-season-name"
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
            value={assetType}
            label="Asset types"
            onChange={(val: any) => {
              setAssetType(val.target.value);
            }}
            options={assetTypesOptions}
          />
        </Col>
        <Col sm={4}>
          <TextInput
            id="contract-addess"
            label="Contract address"
            variant="outlined"
            value={contractAdderss}
            onChange={(e: any) => {
              setContractAddress(e.target.value);
            }}
          />
        </Col>

        {mode == "edit" ? (
          <Col sm={4}>
            <TextInput
              id="block-bumber"
              label="Block number"
              variant="outlined"
              value={blockNumber}
              disabled={true}
              /*onChange={(e: any) => {
                setBlockNumber(e.target.value);
              }}*/
            />
          </Col>
        ) : (
          ""
        )}

        <Col sm={4}>
          <TextInput
            id="payout-address"
            label="Payout address"
            variant="outlined"
            value={payoutAddres}
            onChange={(e: any) => {
              setPayoutAddress(e.target.value);
            }}
          />
        </Col>
        <Col sm={4}>
          <TextInput
            id="seller-fees"
            label="Seller fees"
            variant="outlined"
            value={sellerFees}
            onChange={(e: any) => {
              setSellerFees(e.target.value);
            }}
          />
        </Col>
        <Col sm={4} style={{ marginTop: "10px" }}>
          <SelectDropDown
            value={category}
            label="Category"
            onChange={(val: any) => {
              setCategory(val.target.value);
            }}
            options={categoriesOptions}
          />
        </Col>
        <Col sm={12}>
          <TextInput
            id="contract-description"
            label="Contract description"
            rows={5}
            variant="outlined"
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          />
        </Col>
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
        <label>Contract Abi</label>

        <BlueButtonWithText
          variant="contained"
          color="primary"
          btnSize="sm"
          buttonClickHandler={() => setOpenContractAbi(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={
            !selectedAbiFile ? "Select contract abi" : "Update contract abi"
          }
        />

        <DropzoneDialog
          //acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload Abi Json file"
          open={openContractAbi}
          onClose={() => setOpenContractAbi(false)}
          onSave={(files: any) => {
            const fileReader = new FileReader();
            fileReader.readAsText(files[0]);
            fileReader.onloadend = () => {
              try {
                setOpenContractAbi(false);
                setSelectedAbiFile(files[0]);
                setFileAbiUpdated(true);

                setContractAbi(fileReader.result);
              } catch (e) {
                console.log(e);
                //setErrorData("**Not valid JSON file!**");
              }
            };
          }}
          showPreviews={false}
          showFileNamesInPreview={false}
        />
        {selectedAbiFile && "Abi file added."}
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
        <label>Logo image</label>

        <BlueButtonWithText
          variant="contained"
          color="primary"
          btnSize="sm"
          buttonClickHandler={() => setOpenLogo(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={!selectedLogoFile ? "Select log image" : "Update logo"}
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload logo"
          open={openLogo}
          onClose={() => setOpenLogo(false)}
          onSave={(files: any) => {
            setOpenLogo(false);
            setSelectedLogoFile(files[0]);
            setFileLogoUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setPreviewLogo(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedLogoFile && (
          <img
            src={previewLogo}
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
        <label>Featured image</label>

        <BlueButtonWithText
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpenFeatuerd(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          btnSize="sm"
          value={
            !selectedFeatuerdFile
              ? "Select featuerd image"
              : "Update featured image."
          }
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload featured image."
          open={openFeatuerd}
          onClose={() => setOpenFeatuerd(false)}
          onSave={(files: any) => {
            setOpenFeatuerd(false);
            setSelectedFeatuerdFile(files[0]);
            setFeatuerdUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setFeatuerdPreview(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedFeatuerdFile && (
          <img
            src={previewFeatuerd}
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
        <label>Banner image</label>

        <BlueButtonWithText
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpenBanner(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          btnSize="sm"
          value={!selectedBannerFile ? "Select banner image" : "Update banner"}
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload logo"
          open={openBanner}
          onClose={() => setOpenBanner(false)}
          onSave={(files: any) => {
            setOpenBanner(false);
            setSelectedBannerFile(files[0]);
            setFileBannerUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setBannerPreview(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedBannerFile && (
          <img
            src={previewBanner}
            width={200}
            height={200}
            style={{ marginTop: "30px", borderRadius: "5px" }}
          />
        )}
        <Row>
          <Col sm={12} style={{ textAlign: "left" }}>
            <h3>Attributes</h3>
          </Col>
          <Col sm={4}>
            <TextInput
              id="key-add"
              label="Key"
              variant="outlined"
              value={attrKey}
              onChange={(e: any) => {
                setAttrKey(e.target.value);
              }}
            />
          </Col>
          {/*<Col sm={4}>
            <InputTextField
              id="key-value"
              label="Value"
              variant="outlined"
              value={attrValue}
              onChange={(e: any) => {
                setAttrValue(e.target.value);
              }}
            />
            </Col>*/}
          <Col sm={4}>
            <BlueButtonWithText
              sx={{
                margin: "10px",
                backgroundColor: "#48ABDF",
                color: "white",
                padding: "10px 25px",
                borderRadius: "7px",
              }}
              btnSize="sm"
              buttonClickHandler={attributesUpdate}
              value={"Add"}
            />
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
                  {/* <TableCell style={{ color: "white" }}>Value</TableCell>*/}
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{attrList}</TableBody>
            </Table>
          </Col>
        </Row>
        {/*<Row>
          <Col sm={12} style={{ textAlign: "left" }}>
            <h3>Pannel attributes</h3>
          </Col>
          <Col sm={4}>
            <InputTextField
              id="key-add"
              label="Key"
              variant="outlined"
              value={pannelKey}
              onChange={(e: any) => {
                setPannelKey(e.target.value);
              }}
            />
          </Col>
          <Col sm={4}>
            <InputTextField
              id="key-value"
              label="Value"
              variant="outlined"
              value={pannelValue}
              onChange={(e: any) => {
                setPannelValue(e.target.value);
              }}
            />
          </Col>
          <Col sm={4}>
            <Button
              sx={{
                margin: "10px",
                backgroundColor: "#48ABDF",
                color: "white",
                padding: "10px 25px",
                borderRadius: "7px",
              }}
              btnSize="sm"
              onClick={(e: any) => {
                if (pannelKey && pannelValue) {
                  let pannelAttrList = attributesPanel;
                  pannelAttrList.push({
                    trait_type: pannelKey,
                    value: pannelValue,
                  });
                  setAttributesPanel(pannelAttrList);
                }
              }}
              value={"Add"}
            />
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
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{pannelAttrList}</TableBody>
            </Table>
          </Col>
            </Row>*/}
      </div>
      <div style={{ width: "100%", display: "flex", direction: "rtl" }}>
        <BlueButtonWithText
          sx={{
            margin: "10px",
            backgroundColor: "#48ABDF",
            color: "white",
            padding: "10px 25px",
            borderRadius: "7px",
          }}
          btnSize="sm"
          buttonClickHandler={onClose}
          value={"Close"}
        />

        <BlueButtonWithText
          sx={{
            margin: "10px",
            backgroundColor: "#48ABDF",
            color: "white",
            padding: "10px 25px",
            borderRadius: "7px",
          }}
          btnSize="sm"
          buttonClickHandler={() => {
            mode == "edit"
              ? PutUpdateCollection(
                  details?.id,
                  {
                    logoFile: fileLogoUpdated ? selectedLogoFile : null,
                    bannerFile: fileBannerUpdated ? selectedBannerFile : null,
                    feautredFile: fileFeatuerdUpdated
                      ? selectedFeatuerdFile
                      : null,
                  },
                  {
                    name,
                    description,
                    seasonName,
                    assetType,
                    contractAdderss,
                    contractAbi: fileAbiUpdated ? contractAbi : null,
                    blockNumber,
                    payoutAddres,
                    sellerFee: parseFloat(sellerFees),
                    categoryId: category,
                    attributes,
                    attributesPanel,
                  },
                  dispatch,
                  onClose
                )
              : PostCreateCollection(
                  {
                    name,
                    description,
                    seasonName,
                    assetType,
                    contractAdderss,
                    contractAbi: fileAbiUpdated ? contractAbi : null,
                    blockNumber,
                    payoutAddres,
                    sellerFee: parseFloat(sellerFees),
                    categoryId: category,
                    attributes,
                    attributesPanel,
                  },
                  {
                    logoFile: selectedLogoFile,
                    bannerFile: selectedBannerFile,
                    feautredFile: selectedFeatuerdFile,
                  },
                  dispatch,
                  onClose
                );
          }}
          value={"Save"}
        />
      </div>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  categories: {
    results: state.category?.results,
    page: state.category?.page,
    size: state.category?.size,
    total: state.category?.total,
  },
  collection: {
    results: state.collection?.results,
    page: state.collection?.page,
    size: state.collection?.size,
    total: state.collection?.total,
  },
  assetTypes: state.asset.assetTypes,
});

export default connect(mapStateToProps)(CollectionAdd);
