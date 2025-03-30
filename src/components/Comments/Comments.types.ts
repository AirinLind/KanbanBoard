import { CommentProps } from "../../store/ducks/comments";

export type CommentsState = {
  [todoId: number]: CommentProps[];
};

export type AddComment = (todoId: number, comment: CommentProps) => void;
export type UpdateComment = (
  todoId: number,
  commentIndex: number,
  newText: string,
) => void;
export type DeleteComment = (todoId: number, commentIndex: number) => void;

export type CommentsProps = {
  todoId: number;
  comments: CommentProps[];
  addComment: AddComment;
  updateComment: UpdateComment;
  deleteComment: DeleteComment;
  authorName: string;
};
