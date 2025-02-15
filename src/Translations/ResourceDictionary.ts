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
    PostForm: {
      postButton: string;
      headerTitle: string;
      headerTitleEdit: string;
      title: string;
      image: string;
      dialogTitle: string;
      dialogBody: string;
      dialogConfirmButton: string;
      dialogCancelButton: string;
      saveError: string;
    };
    Comments: {
      title: string;
      postNewComment: string;
      postButton: string;
    };
    Post: {
      deleteButton: string;
      editButton: string;
    };
    DeletePostDialog: {
      title: string;
    };
  };
  Components: {
    Dialog: {
      confirmButton: string;
      cancelButton: string;
    };
  };
}
