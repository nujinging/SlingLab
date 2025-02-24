package meme.book.back.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Article;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ArticleResponseDto {

    @Schema(name = "articleIdx", description = "게시글 번호")
    private Long articleIdx;

    @Schema(name = "articleTitle", description = "게시글 제목")
    private String articleTitle;

    @Schema(name = "memberIdx", description = "회원 번호")
    private Long memberIdx;

    @Schema(name = "articleContent", description = "게시글 내용")
    private String articleContent;

    @Schema(name = "tag", description = "게시글 태그")
    private String tag;

    @Schema(name = "regDtm", description = "등록일시")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regDtm;

    @Schema(name = "likeCount", description = "좋아요 수")
    private long likeCount;

    public static ArticleResponseDto toDto(Article article) {
        return new ArticleResponseDto()
                .setArticleIdx(article.getArticleIdx())
                .setArticleTitle(article.getArticleTitle())
                .setArticleContent(article.getArticleContent())
                .setMemberIdx(article.getMemberIdx())
                .setRegDtm(article.getRegDtm())
                .setTag(article.getTag())
                .setLikeCount(article.getArticleLikeCnt());
    }

}
