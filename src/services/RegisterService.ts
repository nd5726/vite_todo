import { apiHelper } from "../http-common";

import ResponseData from "@/@types/responseData";
import { registerUser } from "@/@types/registerUser";

class RegisterService {
  register(data: any) {
    return apiHelper.post<ResponseData<registerUser>>("/users", { user: data });
  }
}

export default new RegisterService();
