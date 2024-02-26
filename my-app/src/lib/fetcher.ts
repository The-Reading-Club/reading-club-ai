import axios from "axios";

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    console.log("res", res);

    return res.data;
  });

export default fetcher;
