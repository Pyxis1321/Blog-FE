export interface ResourceDictionary {
  Auth: {
    username: string;
    password: string;
    registration: string;
    Form: {
      required: string;
    };
  };
  Dashboard: {
    addPost: string;
  };
  Post: {
    NewPost: {
      title: string;
    };
  };
}
