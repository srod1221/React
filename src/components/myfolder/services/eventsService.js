import axios from "axios";

var eventsService = {
  endpoint: "https://api.remotebootcamp.dev/api/events",
};

const addEvent = (payload) => {
  const config = {
    method: "POST",
    url: eventsService.endpoint,
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
const getFeed = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${eventsService.endpoint}/feed?pageindex=${pageIndex}&pagesize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  // do not forget your return here
  return axios(config);
};

export { addEvent, getFeed };
