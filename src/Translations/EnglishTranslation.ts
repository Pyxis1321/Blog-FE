import type { ResourceDictionary } from "./ResourceDictionary";

export const TranslationResources: ResourceDictionary = {
  Auth: {
    website: "Catalyst",
    loginTitle: "Log in to your account",
    registerTitle: "Create your account",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    registrationQuestion: "Don't have an account?",
    loginQuestion: "Already have an account?",
    registrationText: "Register here",
    loginText: "Log in here",
    login: "Log in",
    register: "Register",
    Form: {
      required: "This field is required",
      Validation: {
        passwordsNotMatching: "Passwords do not match",
        PasswordRules: {
          passwordMinLength: "Password must be at least 6 characters long",
          passwordDigit: "Password must contain a digit",
          passwordLowercase: "Password must contain a lowercase letter",
          passwordUppercase: "Password must contain an uppercase letter",
          passwordSpecialCharacter: "Password must contain a special character",
        },
      },
    },
  },
  Dashboard: {
    Tabs: {
      Home: {
        tab: "Home",
        title: "Welcome to the dashboard",
      },
      Settings: {
        title: "Settings",
        Component: {
          title: "Account Settings",
          subtitle: "Manage your account settings and preferences.",
          content: "More settings options will be added here.",
          logout: "Logout",
        },
      },
    },
    addPost: "Add post",
    placeholder: "Search posts...",
  },
  Post: {
    PostForm: {
      postButton: "Post",
      headerTitle: "Make a new post",
      headerTitleEdit: "Edit post",
      title: "Title",
      image: "Title image URL",
      dialogTitle: "Discard post?",
      dialogBody: "Are you sure you want to discard this post?",
      dialogConfirmButton: "Discard",
      dialogCancelButton: "Cancel",
      saveError: "Failed to save post, please try again later",
    },
    Comments: {
      title: "Comments",
      postButton: "Post",
      postNewComment: "Post a new comment",
    },
    Post: {
      deleteButton: "Delete",
      editButton: "Edit",
    },
    DeletePostDialog: {
      title: "Delete post",
      content: "Are you sure you want to delete this post?",
    },
  },
  Components: {
    Dialog: {
      confirmButton: "Confirm",
      cancelButton: "Cancel",
    },
  },
};
