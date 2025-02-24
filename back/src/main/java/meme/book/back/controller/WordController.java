package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.word.WordInsertRequestDto;
import meme.book.back.dto.word.WordRequestDto;
import meme.book.back.dto.word.WordUpsertRequestDto;
import meme.book.back.exception.CustomException;
import meme.book.back.service.WordService;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "단어 API", description = "단어 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/word")
public class WordController {

    private final WordService wordService;

    @Operation(summary = "단어 및 컨텐츠 등록 API", description = "단어(컨텐츠)를 등록한다.")
    @PostMapping("/create")
    public ResponseEntity<?> createWord(@RequestBody WordInsertRequestDto requestDto) {
        return ResponseEntity.ok(wordService.createWord(requestDto));
    }

    @Operation(summary = "단어 컨텐츠 수정 API", description = "단어를 수정한다.")
    @PutMapping("/update")
    public ResponseEntity<?> updateWord(@RequestBody WordUpsertRequestDto requestDto) {
        return ResponseEntity.ok(wordService.updateWord(requestDto));
    }

    @Operation(summary = "단어 컨텐츠 조회 API", description = "단어 컨텐츠를 조회한다.")
    @GetMapping("/{wordIdx}")
    public ResponseEntity<?> getWord(@PathVariable Long wordIdx,
                                     @RequestParam Long memberIdx,
                                     @RequestParam(defaultValue = "1") int page,
                                     @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        return ResponseEntity.ok(wordService.getWordContent(pageable, wordIdx, memberIdx));
    }

    @Operation(summary = "단어 리스트 조회 API", description = "단어를 리스트를 조회한다.")
    @GetMapping("/list")
    public ResponseEntity<?> getWordListController(@RequestParam(defaultValue = "1") int page,
                                                   @RequestParam(defaultValue = "10") int pageSize,
                                                   @RequestParam(required = false) NationCode nation,
                                                   @RequestParam(required = false) SortType sort,
                                                   @RequestParam(required = false) String sortBy,
                                                   @RequestParam(required = false) String search
    ) {
        if (sort == null && sortBy != null) {
            throw new CustomException(ErrorCode.NOT_CORRECT_PARAMETER);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        WordRequestDto requestDto = new WordRequestDto()
                .setNationCode(nation)
                .setSearch(search)
                .setSort(sort)
                .setSortBy(sortBy);

        return ResponseEntity.ok(wordService.getWordListService(pageable, requestDto));
    }

    @Operation(summary = "단어 컨텐츠 전체 삭제 API", description = "전체 단어 컨텐츠를 삭제한다.")
    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteWordContent(@RequestParam Long memberIdx) {
        wordService.deleteAllWordContent(memberIdx);

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "단어 컨텐츠 선택 삭제 API", description = "단어의 컨텐츠를 선택 삭제한다.")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteWordContentList(@RequestParam List<Long> wordContentIdx) {
        wordService.deleteWordContentList(wordContentIdx);

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "회원 등록 단어 조회 API", description = "회원이 등록한 단어 리스트를 조회한다.")
    @GetMapping("/list/{memberIdx}")
    public ResponseEntity<?> getWordListByMember(@PathVariable Long memberIdx,
                                                 @RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "10") int pageSize) {

        Pageable pageable = PageRequest.of(page - 1, pageSize);
        log.info("Get Member Word List, memberIdx: {}, page: {}, pageSize: {}", memberIdx, page, pageSize);

        return ResponseEntity.ok(wordService.getWordListByMember(pageable, memberIdx));
    }

}
