import { apiHelper } from "../http-common";
import ResponseData from "@/@types/responseData";
import { todoData } from "@/@types/todoData";

class todoDataService {
  getAll():Promise<ResponseData<todoData[]>> {
    return apiHelper.get("/todos");
  }

  create(data: todoData):Promise<ResponseData> {
    return apiHelper.post("/todos", { todo: data });
  }

  update(id: string):Promise<ResponseData> {
    return apiHelper.patch(`/todos/${id}/toggle`);
  }

  delete(id: string):Promise<ResponseData> {
    return apiHelper.delete(`/todos/${id}`);
  }
}

export default new todoDataService();
