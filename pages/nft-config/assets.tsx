import type { NextPage } from "next";
import { BlueButtonWithText, CardPanel } from "mv-shared-components/dist";

import { useDispatch } from "react-redux";
import React, { useState } from "react";

import List from "../../components/Assets/AssetsList";
import Add from "../../components/Assets/AssetsAdd";

import MUIButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { GetAssetExport, PostAssetImport } from "../../server-apis/assets-apis";
import AssetsImportForm from "../../components/Assets/AssetsImportForm";
import AssetsExportForm from "../../components/Assets/AssetsExportForm";

const Assets: NextPage = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [mode, setMode] = useState("list");
  const changePage = (action: any = "list") => {
    setMode(action);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseExport = () => {
    setOpenExport(false);
  };
  const handleClickOpenExport = () => {
    setOpenExport(true);
  };

  const [open, setOpen] = React.useState(false);
 
  const [openExport, setOpenExport] = React.useState(false);

  const [importFile, setImportFile] = React.useState(null);
  const pages: any = {
    list: {
      title: "Assets",
      component: (
        <List
          openDetails={(catDet: any) => {
            setDetails(catDet);
            changePage("edit");
          }}
        />
      ),
      actions: (
        <div>
          <BlueButtonWithText
            btnSize={"sm"}
            sx={{
              backgroundColor: "#48ABDF",
              color: "white",
              padding: "10px 25px",
              borderRadius: "7px",
            }}
            buttonClickHandler={() => {
              changePage("add");
            }}
            value={"Add New"}
          />
          <BlueButtonWithText
            btnSize={"sm"}
            sx={{
              backgroundColor: "#48ABDF",
              color: "white",
              padding: "10px 25px",
              borderRadius: "7px",
            }}
            buttonClickHandler={handleClickOpen}
            value={"Import"}
          />
          <BlueButtonWithText
            btnSize={"sm"}
            // height={"50px"}
            // width={"200px"}
            sx={{
              backgroundColor: "#48ABDF",
              color: "white",
              padding: "10px 25px",
              borderRadius: "7px",
            }}
            buttonClickHandler={handleClickOpenExport}
            value={"Export"}
          />
        </div>
      ),
    },
    add: {
      title: "Add new assets",
      component: (
        <Add
          onClose={() => {
            changePage("list");
          }}
          mode={mode}
          details={{}}
        />
      ),
    },
    edit: {
      title: "Edit asset",
      component: (
        <Add
          onClose={() => {
            changePage("list");
          }}
          mode={mode}
          details={details}
        />
      ),
    },
  };
  return (
    <div>
      <CardPanel
        style={{ width: "100%", backgroundColor: "#2D2D2D", color: "white" }}
        title={pages[mode].title}
        action={pages[mode].actions ? pages[mode].actions : <div></div>}
        cardContent={pages[mode].component}
      />
      <AssetsImportForm open={open} handleClose={handleClose} />
      <AssetsExportForm open={openExport} handleClose={handleCloseExport} />
      {/*<div>
        <Dialog open={open} onClose={handleClose} sx={{ zIndex: 400 }}>
          <DialogTitle>Import assets bulk</DialogTitle>
          <DialogContent>
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: "none" }}
                type="file"
                onChange={(e: any) => {
                  const fileReader = new FileReader();
                  fileReader.readAsText(e.target.files[0]);
                  fileReader.onloadend = () => {
                    try {
                      if (fileReader && fileReader.result) {
                        setImportFile(JSON.parse(fileReader.result.toString()));
                      }
                    } catch (e) {
                      console.log(e);
                      //setErrorData("**Not valid JSON file!**");
                    }
                  };
                }}
              />
              <MUIButton
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Choose Files
              </MUIButton>
            </label>
            {importFile ? "  File for bulk import selected" : ""}
          </DialogContent>
          <DialogActions>
            <BlueButtonWithText
              btnSize={"sm"}
              sx={{
                backgroundColor: "#48ABDF",
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
                backgroundColor: "#48ABDF",
                color: "white",
                padding: "10px 25px",
                borderRadius: "7px",
              }}
              buttonClickHandler={() => {
                if (importFile) PostAssetImport(importFile, dispatch);
              }}
              value={"Import"}
            />
          </DialogActions>
        </Dialog>
            </div>*/}
    </div>
  );
};

export default Assets;
