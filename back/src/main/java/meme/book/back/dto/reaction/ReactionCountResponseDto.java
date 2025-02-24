package meme.book.back.dto.reaction;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ReactionCountResponseDto {

    Long likeCount;

    Long dislikeCount;

}
