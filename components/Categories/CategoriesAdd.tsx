import type { NextPage } from "next";
import Box from "@mui/material/Box";
import {BlueButtonWithText,TextInput,} from "mv-shared-components/dist";

import { connect, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid-system";
import React, { useEffect, useState } from "react";

import {
  GetCategories,
  PostCreateCategories,
  PutActiveStatus,
  PutUpdateCategories,
} from "../../server-apis/categories-apis";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Image from "next/image";
import ToggleButton from "../Common/ToggleButton";

import Spinner from "../CommonComponents/Spinner/Spinner";

type CategoriesAddProps = {
  onClose: any;
  mode: any;
  details: any;
  categories: any;
  loading: any;
};

const CategoriesAdd = ({
  onClose,
  mode,
  details,
  categories,
  loading,
}: CategoriesAddProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let tempName: any = "";
  let tempDesc: any = "";
  let tempImg: any = "";
  let tempActive: any = false;

  if (mode && mode == "edit") {
    tempName = details.name;
    tempDesc = details.description;
    tempImg = details.logoImage;
    tempActive = details.isActive;
  }
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(tempName);
  const [description, setDescription] = useState(tempDesc);
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(tempImg);
  const [fileUpdated, setFileUpdated] = useState(false);
  const [preview, setPreview] = useState(tempImg);
  const [isActive, setActive] = useState(tempActive);

  return (
    <Box sx={{ color: "white", alignContent: "start" }}>
      <Row>
        {mode == "edit" ? (
          <Col sm={4} style={{ marginBottom: "5px" }}>
            {" "}
            <TextInput
              label="Category Id"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
              value={details?.id}
              disabled={false}
            />
          </Col>
        ) : (
          ""
        )}
        <Col sm={4} style={{ marginBottom: "5px" }}>
          <TextInput
            label="Name"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            value={name}
            disabled={false}
          />
        </Col>
        <Col sm={4} style={{ marginBottom: "5px" }}>
          <TextInput
            label={"Description"}
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
            disabled={false}
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
                  GetCategories(dispatch, categories.page + 1, categories.size);
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
        <label>Logo image</label>

        <BlueButtonWithText
          btnSize={"sm"}
          variant="contained"
          color="primary"
          buttonClickHandler={() => setOpen(true)}
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          value={!selectedFile ? "select image" : "Update logo"}
        />

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          filesLimit={1}
          dialogTitle="Upload logo"
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files: any) => {
           
            setOpen(false);
            setSelectedFile(files[0]);
            setFileUpdated(true);
            const objectUrl: any = URL.createObjectURL(files[0]);
            setPreview(objectUrl);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
        {selectedFile && (
          <img
            src={preview}
            width={200}
            height={200}
            style={{ marginTop: "30px", borderRadius: "5px" }}
          />
        )}
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
            setLoader(true);
            mode == "edit"
              ? PutUpdateCategories(
                  details?.id,
                  fileUpdated ? selectedFile : null,
                  { name: name, description: description },
                  dispatch,
                  () => {
                    setLoader(false);
                    onClose();
                  }
                )
              : PostCreateCategories(
                  { name: name, description: description },
                  selectedFile,
                  dispatch,
                  () => {
                    setLoader(false);
                    onClose();
                  }
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
  loading: state.spinner.loader,
});

export default connect(mapStateToProps)(CategoriesAdd);
