import { apiHelper } from "../http-common";

import ResponseData from "@/@types/responseData";
import { accountUser } from "@/@types/accountUser";

class LoginService {
  login(data: any): Promise<ResponseData<accountUser>> {
    return apiHelper.post("/users/sign_in", { user: data });
  }
  ckeck(): Promise<ResponseData<accountUser>> {
    return apiHelper.get("/check");
  }
  logout(): Promise<ResponseData> {
    return apiHelper.delete("/users/sign_out");
  }
}

export default new LoginService();
