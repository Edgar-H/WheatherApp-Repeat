import axios from 'axios';

export const getGeoIp = async () => {
  const { data } = await axios
    .get(`http://ip-api.com/json`)
    .then((res) => res)
    .catch((err) => console.log(err));
  return data;
};
