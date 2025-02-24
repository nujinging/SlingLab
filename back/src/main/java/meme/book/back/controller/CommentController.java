package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.comment.CommentRequestDto;
import meme.book.back.service.CommentService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "댓글 API", description = "댓글 관련 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "회원 댓글 리스트 API")
    @GetMapping("/list/{memberIdx}")
    public ResponseEntity<?> getCommentListByMember(@PathVariable Long memberIdx,
                                                    @RequestParam(defaultValue = "1") int page,
                                                    @RequestParam(defaultValue = "10") int pageSize) {
        log.info("Get Comment List, member idx: {}", memberIdx);
        Pageable pageable = PageRequest.of(page-1, pageSize);

        return ResponseEntity.ok(commentService.getCommentListByMember(pageable, memberIdx));
    }

    @Operation(summary = "댓글 생성 API")
    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto requestDto) {
        log.info("Create new Comment Request: {}", requestDto);
        return ResponseEntity.ok(commentService.createComment(requestDto));
    }

    @Operation(summary = "댓글 수정 API")
    @PutMapping("/update/{commentIdx}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentIdx,
                                           @RequestBody CommentRequestDto requestDto) {
        log.info("Update Comment Request, idx: {}, request: {}", commentIdx, requestDto);
        return ResponseEntity.ok(commentService.updateComment(commentIdx, requestDto));
    }

    @Operation(summary = "댓글 좋아요 수정 API")
    @PostMapping("/like/{commentIdx}")
    public ResponseEntity<?> likeUpdateComment(@PathVariable Long commentIdx,
                                               @RequestBody CommentRequestDto requestDto) {
        log.info("Comment Like Update Request, idx: {}, request: {}", commentIdx, requestDto);
        return ResponseEntity.ok(commentService.updateCommentLike(commentIdx, requestDto));
    }

    @Operation(summary = "댓글 전체 삭제 API")
    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteComment(@RequestParam Long memberIdx) {
        log.info("Comment All Delete Request, memberIdx: {}", memberIdx);
        commentService.deleteAllComment(memberIdx);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "댓글 선택 삭제 API")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCommentList(
            @Parameter(description = "댓글 번호 리스트") @RequestParam List<Long> commentIdx) {
        log.info("Comment List Delete Request: {}", commentIdx);
        commentService.deleteCommentList(commentIdx);
        return ResponseEntity.ok().build();
    }

}
