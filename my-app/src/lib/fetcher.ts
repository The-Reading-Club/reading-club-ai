import axios from "axios";

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    console.log("res", res);

    return res.data;
  });

// const fetcher = async (url: string) => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("res", data);
//     return data;
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// };

export default fetcher;
