import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

function useAxios(url) {
  const [data, setData] = useState([]);
  const addData = async (ext) => {
    const response = await axios.get(ext ? url + ext : url);
    setData((data) => [...data, { ...response.data, id: uuid() }]);
  };
  const clearData = () => {
    setData([]);
  };
  return [data, addData, clearData];
}

export default useAxios;
