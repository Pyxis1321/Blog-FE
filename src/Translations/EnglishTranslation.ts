import type { ResourceDictionary } from "./ResourceDictionary";

export const TranslationResources: ResourceDictionary = {
  Auth: {
    username: "Username",
    password: "Password",
    registration: "Register new account",
    Form: {
      required: "This field is required",
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
      deleteButton: "Delete post",
      editButton: "Edit post",
    },
    DeletePostDialog: {
      title: "Delete post?",
    },
  },
  Components: {
    Dialog: {
      confirmButton: "Confirm",
      cancelButton: "Cancel",
    },
  },
};
