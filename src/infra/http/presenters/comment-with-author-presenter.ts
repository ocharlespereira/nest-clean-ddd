import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/values-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {
      commentId: commentWithAuthor.commentId.toString(),
      authorId: commentWithAuthor.authorId.toString(),
      authorName: commentWithAuthor.author.toString(),
      content: commentWithAuthor.content,
      createdAt: commentWithAuthor.createdAt,
      updateAt: commentWithAuthor.updatedAt,
    }
  }
}
