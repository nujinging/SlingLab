package meme.book.back.dto.follow;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class FollowListResponseDto {

    List<FollowResponseDto> followList;

    private int page;

    private int pageSize;

    private long totalPage;

    private long totalCount;
}
