import axios from "axios";

var techcompaniesServices = {
  endpoint: "https://api.remotebootcamp.dev/api/techcompanies",
};

const addCompany = (payload) => {
  const config = {
    method: "POST",
    url: techcompaniesServices.endpoint,
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

const getPage = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${techcompaniesServices.endpoint}?pageindex=${pageIndex}&pagesize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${techcompaniesServices.endpoint}/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};
const search = (pageIndex, pageSize, keyWord) => {
  const config = {
    method: "GET",
    url: `${techcompaniesServices.endpoint}/search?pageindex=${pageIndex}&pagesize=${pageSize}&q=${keyWord}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};
const slug = (slug) => {
  const config = {
    method: "GET",
    url: `${techcompaniesServices.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const updateById = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${techcompaniesServices.endpoint}/${id}`,
    data: payload,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then((response) => {
    return { payload: response.data.items };
  });
};

const updateStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: `${techcompaniesServices.endpoint}/${id}/${statusId}`,
    data: id,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then((response) => {
    return { id: response.data.item };
  });
};

export { addCompany, getPage, getById, search, slug, updateById, updateStatus };
