import http from "../http-common";

import ResponseData from "@/@types/ResponseData";

class RegisterService {
  register(data: any): Promise<ResponseData> {
    return http.post("/users", { data });
  }
}

export default new RegisterService();
