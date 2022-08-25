import { apiHelper } from "../http-common";
import ResponseData from "@/@types/responseData";
import { todoData } from "@/@types/todoData";

class TodoDataService {
  getAll() {
    return apiHelper.get<ResponseData<todoData[]>>("/todos");
  }

  create(data: todoData) {
    return apiHelper.post<ResponseData>("/todos", { todo: data });
  }

  update(id: string) {
    return apiHelper.patch<ResponseData>(`/todos/${id}/toggle`);
  }

  delete(id: string) {
    return apiHelper.delete<ResponseData>(`/todos/${id}`);
  }
}

export default new TodoDataService();
