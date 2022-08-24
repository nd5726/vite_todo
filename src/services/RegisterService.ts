import { apiHelper } from "../http-common";

import ResponseData from "@/@types/responseData";

class RegisterService {
  register(data: any): Promise<ResponseData> {
    return apiHelper.post("/users", { user: data });
  }
}

export default new RegisterService();
