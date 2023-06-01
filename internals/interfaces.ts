export interface DialogElement extends HTMLElement {
  showModal: () => void;
  close: () => void;
}

export interface CatsResponse {
  id: String;
  created_at: String;
  name: String;
  age: number;
}
