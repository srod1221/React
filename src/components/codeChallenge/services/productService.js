/*
Do not modify unless working on React Forms Assessment.
*/
import axios from "axios";

var productService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/products",
};

const addProduct = (payload) => {
  const config = {
    method: "POST",
    url: productService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then((response) => {
    return {
      id: response.data.item,
      ...payload,
    };
  });
};

export { addProduct };
