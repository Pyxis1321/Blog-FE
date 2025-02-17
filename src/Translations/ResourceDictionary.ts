export interface ResourceDictionary {
  Auth: {
    website: string;
    loginTitle: string;
    registerTitle: string;
    registrationQuestion: string;
    loginQuestion: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    registrationText: string;
    loginText: string;
    login: string;
    register: string;
    Form: {
      required: string;
      Validation: {
        passwordsNotMatching: string;
        PasswordRules: {
          passwordMinLength: string;
          passwordDigit: string;
          passwordLowercase: string;
          passwordUppercase: string;
          passwordSpecialCharacter: string;
        };
      };
    };
  };
  Dashboard: {
    Tabs: {
      Home: {
        tab: string;
        title: string;
      };
      Settings: {
        title: string;
        Component: {
          title: string;
          subtitle: string;
          content: string;
          logout: string;
        };
      };
    };
    addPost: string;
    placeholder: string;
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
      content: string;
    };
  };
  Components: {
    Dialog: {
      confirmButton: string;
      cancelButton: string;
    };
  };
}
