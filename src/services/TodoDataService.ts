import http from "../http-common";

class TodoDataService {
  getAll(): Promise<any> {
    return http.get("/todos");
  }

  get(id: any): Promise<any> {
    return http.get(`/todos/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/todos", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/todos/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/todos/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/todos`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/todos?title=${title}`);
  }
}

export default new TodoDataService();
