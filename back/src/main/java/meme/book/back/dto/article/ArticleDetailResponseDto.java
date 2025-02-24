package meme.book.back.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.dto.comment.CommentDto;
import meme.book.back.entity.Article;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
public class ArticleDetailResponseDto {

    private Long articleIdx;

    private String articleTitle;

    private String articleContent;

    private Long articleMemberIdx;

    private String nickname;

    private long commentCount;

    private long articleLikeCount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime articleRegDtm;

    private List<CommentDto> commentDtoList;

    public static ArticleDetailResponseDto toDto(Article article) {
        return new ArticleDetailResponseDto().setArticleIdx(article.getArticleIdx())
                .setArticleMemberIdx(article.getMemberIdx())
                .setArticleLikeCount(article.getArticleLikeCnt())
                .setArticleRegDtm(article.getRegDtm())
                .setArticleTitle(article.getArticleTitle())
                .setArticleContent(article.getArticleContent());

    }
}
