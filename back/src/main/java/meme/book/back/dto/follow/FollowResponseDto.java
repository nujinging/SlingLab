package meme.book.back.dto.follow;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FollowResponseDto {

    private Long followIdx;

    private Long follower;

    private Long followee;
}
