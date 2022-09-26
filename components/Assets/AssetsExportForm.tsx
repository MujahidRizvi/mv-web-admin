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
import { GetAllCollection } from "../../server-apis/collection-apis";
import { GetAssetExport, GetAssetTypes, PostAssetImport } from "../../server-apis/assets-apis";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type AssetExportFormProps = {
  handleClose: any;
  open: any;
  assetTypes: any;
  collections: any;
};

const AssetExportForm = ({
  handleClose,
  open,
  assetTypes,
  collections,
}: AssetExportFormProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    GetAllCollection(dispatch);
    GetAssetTypes(dispatch);
  }, []);

  //const [open, setOpen] = React.useState(false);

  const [assetType, setAssetType] = useState("-1");
  const [collectionId, setCollectionId] = useState("-1");

  const resetPage = () => {
    //setOpen(false);
    //setImportFile(null);
    //setImportAttachmentFile(null);
  };


  let collectionOption: any = [
    <MenuItem value={-1} key={"-1"}>
      {"-- Select --"}
    </MenuItem>,
  ];
  collections?.forEach((val: any) => {
    collectionOption.push(
      <MenuItem value={val.id} key={val.id}>
        {val.name}
      </MenuItem>
    );
  });

  let assetTypeOptions: any = [
    <MenuItem style={{ color: "black" }} value={-1} key={"-11"}>
      {"-- Select --"}
    </MenuItem>,
  ];

  assetTypes?.forEach((val: any) => {
    assetTypeOptions.push(
      <MenuItem style={{ color: "black" }} value={val.type} key={val.id}>
        {val.type}
      </MenuItem>
    );
  });


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 400 }}
        PaperProps={{
          style: {
            backgroundColor: "#2D2D2D",
          },
        }}
      >
        <DialogTitle sx={{ color: "#DAC378" }}>Export assets bulk</DialogTitle>
        <DialogContent>
          {/*<Row style={{ marginTop: "10px", marginBottom: "10px" }}>
            <SelectDropDown
              label="Colletion"
              value={collectionId}
              onChange={(e: any) => {
                setCollectionId(e.target.value);
              }}
              options={collectionOption}
            />
            </Row>*/}
         <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
            <SelectDropDown
              label="Asset type"
              value={assetType}
              onChange={(e: any) => {
                setAssetType(e.target.value);
              }}
              options={assetTypeOptions}
            />
            </Row>

        </DialogContent>
        <DialogActions>
          <BlueButtonWithText
            btnSize={"sm"}
            sx={{
              backgroundColor: "#DAC383",
              color: "white",
              padding: "10px 25px",
              borderRadius: "7px",
            }}
            buttonClickHandler={handleClose}
            value={"close"}
          />
          <BlueButtonWithText
            btnSize={"sm"}
            sx={{
              backgroundColor: "#DAC383",
              color: "white",
              padding: "10px 25px",
              borderRadius: "7px",
            }}
            buttonClickHandler={() => {
              GetAssetExport(dispatch,assetType)
            }}
            value={"Export"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  assetTypes: state.asset?.assetTypes,
  collections: state.collection?.results,
});

export default connect(mapStateToProps)(AssetExportForm);
