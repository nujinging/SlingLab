package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.follow.FollowRequestDto;
import meme.book.back.service.FollowService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "팔로우 API", description = "팔로우 관련 API")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @Operation(summary = "팔로우 생성/삭제 API", description = "팔로우 등록 및 삭제한다.")
    @PostMapping("/update")
    public ResponseEntity<?> saveFollow(@RequestBody FollowRequestDto requestDto) {
        return ResponseEntity.ok(followService.saveFollow(requestDto));
    }

    @Operation(summary = "팔로우 여부 API", description = "내가 상대를 팔로우하는지에 대한 여부")
    @GetMapping("follow")
    public ResponseEntity<?> isFollow(
            @Parameter(name = "me", description = "나의 회원번호") @RequestParam Long me,
            @Parameter(name = "other", description = "상대방 회원호") @RequestParam Long other) {

        return ResponseEntity.ok(followService.isFollow(me, other));
    }

    @Operation(summary = "나를 팔로우하는 사용자 리스트 조회 API", description = "Followee 리스트 조회.")
    @GetMapping("/followee/list")
    public ResponseEntity<?> getFolloweeList(@RequestParam Long memberIdx,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        
        return ResponseEntity.ok(followService.getFolloweeList(pageable, memberIdx));
    }

    @Operation(summary = "내가 팔로우한 사용자 리스트 조회 API", description = "Follower 리스트 조회.")
    @GetMapping("/follower/list")
    public ResponseEntity<?> getFollowerList(@RequestParam Long memberIdx,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        return ResponseEntity.ok(followService.getFollowerList(pageable, memberIdx));
    }

}
