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
    addPost: "Add post",
  },
  Post: {
    NewPost: {
      postButton: "Post",
      headerTitle: "Make a new post",
      title: "Title",
      image: "Title image URL",
      dialogTitle: "Discard post?",
      dialogBody: "Are you sure you want to discard this post?",
      dialogConfirmButton: "Discard",
      dialogCancelButton: "Cancel",
    },
    Comments: {
      title: "Comments",
      postButton: "Post",
      postNewComment: "Post a new comment",
    },
    Post: {
      deleteButton: "Delete post",
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
