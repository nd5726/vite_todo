import { apiHelper } from "../http-common";

import ResponseData from "@/@types/responseData";
import { registerUser } from "@/@types/registerUser";

class registerService {
  register(data: any): Promise<ResponseData<registerUser>>{
    return apiHelper.post("/users", { user: data });
  }
}

export default new registerService();
