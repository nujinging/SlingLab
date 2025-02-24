package meme.book.back.dto.reaction;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.ActionType;

@Data
@Accessors(chain = true)
public class ReactionRequestDto {

    private ActionType reactionType;

    private Long memberIdx;

    private Long wordIdx;

}
