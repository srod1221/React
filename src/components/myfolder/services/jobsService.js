import axios from "axios";

var jobsService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

const addJob = (payload) => {
  const config = {
    method: "POST",
    url: jobsService.endpoint,
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
    url: `${jobsService.endpoint}?pageindex=${pageIndex}&pagesize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${jobsService.endpoint}/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};
const search = (pageIndex, pageSize, searchTerm) => {
  const config = {
    method: "GET",
    url: `${jobsService.endpoint}/search?pageindex=${pageIndex}&pagesize=${pageSize}&searchTerm=${searchTerm}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};
const slug = (slug) => {
  const config = {
    method: "GET",
    url: `${jobsService.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const updateById = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${jobsService.endpoint}/${id}`,
    data: payload,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then(() => {
    return payload;
  });
};

const updateStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: `${jobsService.endpoint}/${id}/${statusId}`,
    data: id,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then((response) => {
    return { id: response.data.item };
  });
};

export { addJob, getPage, getById, search, slug, updateById, updateStatus };
