import axios from "axios";
export default axios.create({
  baseURL: "https://todoo.5xcamp.us",
  headers: {
    "Content-type": "application/json",
  },
});
