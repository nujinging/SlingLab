package meme.book.back.repository.comment;

import meme.book.back.dto.comment.CommentDto;

import java.util.List;

public interface CommentCustomRepository {

    List<CommentDto> getCommentList(Long articleIdx);
}
