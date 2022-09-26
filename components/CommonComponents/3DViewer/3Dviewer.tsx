import "@google/model-viewer";

const Model = (props: any) => {
  const styles: any = {
    modelViewer: {
      width:props.width,
      height: props.height,
    },
  };

  return (
    <>
    {/* @ts-ignore */}
      <model-viewer
        style={styles.modelViewer}
        src={props.src}
        ios-src=""
        poster={props.poster}
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
      />
    </>
  );
};

export default Model;