package meme.book.back.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class CommentDto {

    private Long commentIdx;

    private String commentContent;

    private long commentLikeCount;

    private String nickname;

    private Long commentMemberIdx;

    private Long upperIdx;

    private boolean deleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime commentRegDtm;

    private List<CommentDto> commentReplyList = new ArrayList<>();

}
