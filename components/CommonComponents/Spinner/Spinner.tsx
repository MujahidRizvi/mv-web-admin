import Head from "next/head";
import React, { useEffect, useState, CSSProperties } from "react";
import Loader from "react-spinners/RingLoader";
import { connect } from "react-redux";

type SpinnerProps = {
  loading: boolean;
};
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Spinner({ loading }: SpinnerProps) {
  let [color, setColor] = useState("#ffffff");
  return (
    <>
      {loading ? (
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            top: "0px",
            bottom:"0px",
            left: "0px",
            display: "flex",
            textAlign: "center",
            fontSize: "1.2em",
            color: "#FFF",
            background: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
        >
          <Loader
            color="#ffffff"
            loading={loading}
            style={{
              position: "relative",

              margin: 'auto',
              width: "50px",
              maxHeight: "100%",
            }}
          />{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.spinner.loader,
});

export default connect(mapStateToProps)(Spinner);
