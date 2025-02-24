package meme.book.back.dto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CommentRequestDto {

    @Schema(name = "commentContent", description = "댓글 내용")
    private String commentContent;

    @Schema(name = "articleIdx", description = "게시글 번호")
    private Long articleIdx;

    @Schema(name = "memberIdx", description = "회원 번호")
    private Long memberIdx;

    @Schema(name = "upperIdx", description = "상위 메시지 번호(댓글 = 0, 대댓글 = 부모 메시지 번호)")
    private long upperIdx = 0L;
}
