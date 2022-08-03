import axios from "axios";

var friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};

const addFriend = (payload) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint,
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
    url: `${friendsService.endpoint}?pageindex=${pageIndex}&pagesize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${friendsService.endpoint}/${id}`,
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
    url: `${friendsService.endpoint}/search?pageindex=${pageIndex}&pagesize=${pageSize}&q=${keyWord}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};
const slug = (slug) => {
  const config = {
    method: "GET",
    url: `${friendsService.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const updateById = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${friendsService.endpoint}/${id}`,
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
    url: `${friendsService.endpoint}/${id}/${statusId}`,
    data: id,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config).then((response) => {
    return { id: response.data.item };
  });
};

const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `${friendsService.endpoint}/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => {
    return id;
  });
};
export {
  addFriend,
  getPage,
  getById,
  search,
  slug,
  updateById,
  updateStatus,
  deleteById,
};
