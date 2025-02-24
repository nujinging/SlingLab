package meme.book.back.dto.reaction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Reaction;
import meme.book.back.utils.ActionType;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReactionDto {

    /* 리액션 idx */
    private Long reactionIdx;

    /* 리액션 타입 */
    private ActionType reactionType;

    /* 리액션 등록자 */
    private Long memberIdx;

    /* 리액션 단어 */
    private Long targetIdx;

    /* 리액션 생성시간 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reactionRegDtm;

    /* 리액션 수정시간 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reactionModDtm;

    // Entity -> DTO 변환
    public static ReactionDto toDto(Reaction entity) {
        return new ReactionDto()
                .setReactionIdx(entity.getReactionIdx())
                .setReactionType(entity.getReactionType())
                .setMemberIdx(entity.getMemberIdx())
                .setTargetIdx(entity.getTargetIdx())
                .setReactionRegDtm(entity.getReactionRegDtm())
                .setReactionModDtm(entity.getReactionModDtm());
    }

}
