package meme.book.back.dto.follow;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FollowRequestDto {

    @Schema(description = "팔로우 하는 회원 idx")
    private Long follower;

    @Schema(description = "팔로우 당하는 회원 idx")
    private Long followee;

}
