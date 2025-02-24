package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.reaction.ReactionDto;
import meme.book.back.dto.reaction.ReactionRequestDto;
import meme.book.back.service.ReactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "반응 API", description = "좋아요/싫어요 등의 API")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/reaction")
public class ReactionController {

    private final ReactionService reactionService;

    @Operation(summary = "단어의 반응 수정 API", description = "단어의 좋아요/싫어요를 수정한다.")
    @PostMapping("/word/update")
    public ResponseEntity<?> upsertReaction(@RequestBody ReactionRequestDto reactionDto) {
        log.info("Reaction Request: {}", reactionDto);

        return ResponseEntity.ok(reactionService.upsertWordReaction(reactionDto));
    }

    @Operation(summary = "단어의 반응 카운트 API", description = "해당 단어에 대한 좋아요/싫어요 카운트를 조회한다.")
    @GetMapping("/count")
    public ResponseEntity<?> countReactionByWordIdx(@RequestParam Long wordIdx) {
        log.info("Reaction Count By WordIdx: {}", wordIdx);

        return ResponseEntity.ok(reactionService.countReactionService(wordIdx));
    }
}
