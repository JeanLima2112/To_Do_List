export interface Task {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  status?: string;
  expirationDate: string;
}
