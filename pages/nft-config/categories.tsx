import type { NextPage } from "next";
import {BlueButtonWithText,CardPanel} from "mv-shared-components/dist";

import React, { useState } from "react";

import List from "../../components/Categories/CategoriesList";
import Add from "../../components/Categories/CategoriesAdd";

const Categories: NextPage = () => {
  const [details, setDetails] = useState({});
  const [mode, setMode] = useState("list");
  const changePage = (action: any = "list") => {
    setMode(action);
  };
  const pages: any = {
    list: {
      title: "Categories",
      component: (
        <List
          openDetails={(catDet: any) => {
            setDetails(catDet);
            changePage("edit");
          }}
        />
      ),
      actions: (
        <BlueButtonWithText
          buttonClickHandler={() => {
            changePage("add");
          }}
          value={"Add New"}
          btnSize={"sm"}
        />
      ),
    },
    add: {
      title: "Add new category",
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
      title: "Edit category",
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
    </div>
  );
};

export default Categories;
