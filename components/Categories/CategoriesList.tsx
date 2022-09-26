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

import {
  GetCategories,
  PutActiveStatus,
  PutUpdateCategories,
} from "../../server-apis/categories-apis";
import { useRouter } from "next/router";
import { addCategoriesPage } from "../../redux/actions/category-actions/add-categories-page";
import { addCategoriesPageSize } from "../../redux/actions/category-actions/add-categories-page-size";
import ToggleButton from "../Common/ToggleButton";
import {DataTable} from "mv-shared-components/dist";

type CategoriesProps = {
  categories: any;
  openDetails: any;
};

const CategoriesList = ({ categories, openDetails }: CategoriesProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
 // const [columns, setColumn] = useState([]);
  const [page, setPage] = useState(categories.page);
  const [size, setPageSize] = useState(categories.size);

  const columns:any =[
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "name",
      headerName: "Name",
      align: "left",
      width: 200,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "description",
      headerName: "Description",
      align: "left",
      width: 300,
      headerClassName: "removecolumnSeparator",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      align: "left",
      width: 150,
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
                GetCategories(dispatch, categories.page + 1, categories.size);
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
      width: 200,
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
    GetCategories(dispatch, page + 1, size);

   // setColumn();
  }, [router.isReady, page, size]);

  return (
    <Box sx={{ color: "white" }}>
      {" "}
      <DataTable
        rows={categories.results}
        columns={columns}    
        total={categories.total}
        pagination
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
  categories: {
    results: state.category?.results,
    page: state.category?.page,
    size: state.category?.size,
    total: state.category?.total,
  },
});

export default connect(mapStateToProps)(CategoriesList);
