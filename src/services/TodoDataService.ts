import { apiHelper } from "../http-common";
import ResponseData from "@/@types/responseData";
import { todoData } from "@/@types/todoData";

class TodoDataService {
  getAll() {
    return apiHelper.get<ResponseData<todoData[]>>("/todos");
  }

  create(data: any) {
    return apiHelper.post<ResponseData>("/todos", { content: data });
  }

  update(id: string): Promise<ResponseData> {
    return apiHelper.patch(`/todos/${id}/toggle`);
  }

  delete(id: any): Promise<ResponseData> {
    return apiHelper.delete(`/todos/${id}`);
  }
}

export default new TodoDataService();
