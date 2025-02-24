package meme.book.back.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {

    WORD_LIKE("단어 좋아요"),
    WORD_DISLIKE("단어 싫어요"),

    ARTICLE_LIKE("게시글 좋아요"),
    COMMENT_LIKE("댓글 좋아요"),
    ;
    private final String kor;
}
