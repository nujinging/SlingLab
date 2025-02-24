package meme.book.back.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Comment;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class CommentResponseDto {

    @Schema(name = "commentIdx", description = "댓글 번호")
    private Long commentIdx;

    @Schema(name = "commentContent", description = "댓글 내용")
    private String commentContent;

    @Schema(name = "articleIdx", description = "게시글 번호")
    private Long articleIdx;

    @Schema(name = "memberIdx", description = "회원 번호")
    private Long memberIdx;

    @Schema(name = "upperIdx", description = "상위 댓글 번호")
    private Long upperIdx;

    @Schema(name = "likeCount", description = "좋아요 수")
    private long likeCount;

    @Schema(name = "regDtm", description = "등록 일시")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regDtm;

    public static CommentResponseDto toDto(Comment comment) {
        return new CommentResponseDto().setCommentIdx(comment.getCommentIdx())
                .setCommentContent(comment.getCommentContent())
                .setArticleIdx(comment.getArticleIdx())
                .setMemberIdx(comment.getMemberIdx())
                .setRegDtm(comment.getRegDtm())
                .setLikeCount(comment.getCommentLikeCnt())
                .setUpperIdx(comment.getUpperIdx());
    }

}
