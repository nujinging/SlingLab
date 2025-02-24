package meme.book.back.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ArticleListDto {

    @Schema(name = "articleIdx", description = "게시글 번호")
    private Long articleIdx;

    @Schema(name = "articleTitle", description = "게시글 제목")
    private String articleTitle;

    @Schema(name = "articleContent", description = "게시글 내용")
    private String articleContent;

    @Schema(name = "memberIdx", description = "회원 번호")
    private Long memberIdx;

    @Schema(name = "memberNickname", description = "회원 닉네임")
    private String memberNickname;

    @Schema(name = "commentCount", description = "댓글 개수")
    private long commentCount;

    @Schema(name = "regDtm", description = "등록일시")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regDtm;

    @Schema(name = "likeCount", description = "좋아요 수")
    private long likeCount;
}
