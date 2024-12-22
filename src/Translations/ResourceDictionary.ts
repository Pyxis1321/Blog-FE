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
      postButton: string;
      headerTitle: string;
      title: string;
      image: string;
      dialogTitle: string;
      dialogBody: string;
      dialogConfirmButton: string;
      dialogCancelButton: string;
    };
  };
}
