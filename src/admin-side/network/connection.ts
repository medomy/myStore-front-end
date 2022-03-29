import axios from "axios";
import environment from "../../environment";

export const callInstance = axios.create({
    baseURL: environment.baseUrl
  });

