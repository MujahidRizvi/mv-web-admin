import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { connect, useDispatch } from "react-redux";

import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { addCategoriesPage } from "../../redux/actions/category-actions/add-categories-page";
import { addCategoriesPageSize } from "../../redux/actions/category-actions/add-categories-page-size";
import ToggleButton from "../Common/ToggleButton";
import {DataTable} from "mv-shared-components/dist";
import { GetAssets, PutActiveStatus } from "../../server-apis/assets-apis";

type AssetsProps = {
  asset: any;
  openDetails: any;
};

const AssetsList = ({ asset, openDetails }: AssetsProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(asset.page);
  const [size, setPageSize] = useState(asset.size);
  const columns=[
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "assetName",
      headerName: "Name",
      align: "left",
      width: 200,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "collectionName",
      headerName: "Collection",
      align: "left",
      width: 150,
      headerClassName: "removecolumnSeparator",
    },
   {
      field: "assetType",
      headerName: "Type",
      align: "left",
      width: 150,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "description",
      headerName: "Description",
      align: "left",
      width: 200,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "isActive",
      headerName: "Status",
      sortable: false,
      align: "left",
      width: 100,
      headerClassName: "removecolumnSeparator",
      renderCell: (params: any) => {
        const dispatch = () => {}; // useDispatch();
        return (
          <ToggleButton
            checked={params.row.isActive}
            onChange={(val: any) => {
              //setActive(val);
              PutActiveStatus(params.row?.id, val, dispatch, () => {
                GetAssets(dispatch, asset.page+1, asset.size);
                });
            }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      align: "left",
      width: 100,
      headerClassName: "removecolumnSeparator",
      renderCell: (params: any) => {
        const dispatch = () => {}; // useDispatch();
        return (
          <div>
            <Button
              onClick={() => {
                openDetails(params.row);
              }}
            >
              Edit
            </Button>{" "}
            {/* <Button
              onClick={() => {
                PutUpdateCategories(
                  params.row.id,
                  null,
                  { isActive: false, page: page + 1, size: size },
                  dispatch,
                  () => {}
                );
                //alert(params.row.name);
              }}
              sx={{ color: "red" }}
            >
              Delete
            </Button>*/}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    GetAssets(dispatch, page + 1, size);
  }, [router.isReady, page, size]);
  return (
    <Box sx={{ color: "white" }}>
      {" "}
      <DataTable      
        rows={asset.results }
        columns={columns}   
        total={asset.total}      
        page={page}
        pageSize={size}
        onPageChange={(newPage:any) => {
          setPage(newPage);
          //dispatch(addCategoriesPage(newPage));
        }}
        onPageSizeChange={(newPageSize:any) => {
          setPageSize(newPageSize);
          // dispatch(addCategoriesPageSize(newPageSize));
        }}
      />
    </Box>
  );
};
const mapStateToProps = (state: any) => ({
  asset: {
    results: state.asset?.results,
    page: state.asset?.page,
    size: state.asset?.size,
    total: state.asset?.total,
  },
});

export default connect(mapStateToProps)(AssetsList);
