package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.follow.FollowListResponseDto;
import meme.book.back.dto.follow.FollowRequestDto;
import meme.book.back.dto.follow.FollowResponseDto;
import meme.book.back.entity.Follow;
import meme.book.back.repository.follow.FollowRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class FollowService {

    private final FollowRepository followRepository;

    @Transactional
    public FollowResponseDto saveFollow(FollowRequestDto requestDto) {
        Long followIdx;
        Long follower = requestDto.getFollower();
        Long followee = requestDto.getFollowee();

        Optional<Follow> optionalFollow = followRepository.findByFollowerAndFollowee(follower, followee);

        if (optionalFollow.isEmpty()) {
            Follow follow = new Follow()
                    .setFollower(requestDto.getFollower())
                    .setFollowee(requestDto.getFollowee());

            followRepository.save(follow);

            followIdx = follow.getFollowIdx();
            log.info("Save Follower: {}, followee: {}", follower, followee);

        } else {
            followIdx = optionalFollow.get().getFollowIdx();
            followRepository.deleteByFollowIdx(followIdx);

            log.info("Delete Follower: {}, followee: {}", follower, followee);
        }

        return new FollowResponseDto().setFollowIdx(followIdx)
                .setFollower(follower)
                .setFollowee(followee);
    }

    public boolean isFollow(Long me, Long other) {
        log.info("Follow Check, me: {}, other: {}", me, other);
        return followRepository.existsByFollowerAndFollowee(me, other);
    }

    public FollowListResponseDto getFolloweeList(Pageable pageable, Long memberIdx) {
        Page<FollowResponseDto> followList = followRepository.getFollowList(memberIdx, pageable, false);

        log.info("Follow List Count: {}", followList.getTotalElements());

        return new FollowListResponseDto()
                .setFollowList(followList.getContent())
                .setPage(followList.getNumber())
                .setPageSize(followList.getSize())
                .setTotalPage(followList.getTotalPages())
                .setTotalCount(followList.getTotalElements());
    }

    public FollowListResponseDto getFollowerList(Pageable pageable, Long memberIdx) {
        Page<FollowResponseDto> followList = followRepository.getFollowList(memberIdx, pageable, true);

        log.info("Follow List Count: {}", followList.getTotalElements());

        return new FollowListResponseDto()
                .setFollowList(followList.getContent())
                .setPage(followList.getNumber())
                .setPageSize(followList.getSize())
                .setTotalPage(followList.getTotalPages())
                .setTotalCount(followList.getTotalElements());
    }
}
