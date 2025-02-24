package meme.book.back.repository.follow;

import meme.book.back.dto.follow.FollowResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FollowCustomRepository {

    Page<FollowResponseDto> getFollowList(Long memberIdx, Pageable pageable, boolean isFollower);
}
