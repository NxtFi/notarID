export const HashingReducer = () => {
  const initialState = {
    output: { dochash: "", loading: false }, //3
    emailDir: "", //3
    fileName: "", //3
    showMessage: false, //3
    activeAnimationDrag: false, //3
    showResult: false, //3
    inputs: {},
    showResponse: {
      msg: "Sin resultado",
      data: {},
      sellado: false,
      loading: false,
    }, //3
  };

  return <div>HashingReducer</div>;
};
