export interface Task {
  id: number;
  title: String;
  projectId: number;
}

export interface CreateTaskRequest {
  title: String;
  project: { id: number };
}
export interface UpdateTaskRequest {
  title: String;
  project: { id: number };
}
