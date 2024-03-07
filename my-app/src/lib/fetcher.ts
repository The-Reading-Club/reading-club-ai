import axios from "axios";

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => {
      console.log("res", res);

      return res.data;
    })
    .catch((error) => {
      console.error("Axios error:", error);
      // Optionally, throw the error to be handled by React Query's error handling
      throw error;
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
