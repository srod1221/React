import axios from "axios";

var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

const addUser = (payload) => {
  const config = {
    method: "POST",
    url: `${usersService.endpoint}/register`,
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

const login = (payload) => {
  const config = {
    method: "POST",
    url: `${usersService.endpoint}/login`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const getLogin = (id, username, slackId) => {
  const config = {
    method: "GET",
    url: `${usersService.endpoint}/${id}/${username}/${slackId}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const current = () => {
  const config = {
    method: "GET",
    url: `${usersService.endpoint}/current`,
    //data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${usersService.endpoint}/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

const logout = () => {
  const config = {
    method: "GET",
    url: `${usersService.endpoint}/logout`,
    //data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

export { addUser, login, getLogin, current, getById, logout };
