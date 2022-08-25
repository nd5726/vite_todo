import { apiHelper } from "../http-common";

import ResponseData from "@/@types/responseData";

class RegisterService {
  register(data: any) {
    return apiHelper.post<ResponseData>("/users", { user: data });
  }
}

export default new RegisterService();
