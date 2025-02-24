package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.article.ArticleDto;
import meme.book.back.dto.article.ArticleDto.ArticleCreateDto;
import meme.book.back.dto.article.ArticleDto.ArticleUpdateDto;
import meme.book.back.dto.article.ArticleListRequestDto;
import meme.book.back.exception.CustomException;
import meme.book.back.service.ArticleService;
import meme.book.back.utils.AppUtils;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "게시글 API", description = "게시글 관련 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/article")
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "게시글 리스트 API")
    @GetMapping("/list")
    public ResponseEntity<?> getArticleList(@RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize,
                                            @RequestParam(required = false) String tag,
                                            @RequestParam(required = false) String search,
                                            @RequestParam(required = false) Long memberIdx) {

        if (search != null && search.length() < 3) {
            throw new CustomException(ErrorCode.NOT_ALLOW_SIZE_LIMIT);
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize);
        ArticleListRequestDto requestDto = new ArticleListRequestDto()
                .setTag(tag)
                .setSearch(search)
                .setMemberIdx(memberIdx);
        log.info("Get Article List Request, page: {}, pageSize: {}, request: {}", page, pageSize, requestDto);

        return ResponseEntity.ok(articleService.getArticleList(pageable, requestDto));
    }

    @Operation(summary = "게시글 상세 API")
    @GetMapping("/detail/{articleIdx}")
    public ResponseEntity<?> getArticleDetail(@PathVariable Long articleIdx) {
        log.info("Get Article Detail, idx: {}", articleIdx);
        return ResponseEntity.ok(articleService.getArticleDetail(articleIdx));
    }

    @Operation(summary = "게시글 생성 API")
    @PostMapping("/create")
    public ResponseEntity<?> createArticle(@RequestBody ArticleCreateDto articleCreateDto) {
        log.info("Create Article Request: {}", articleCreateDto);
        Long memberIdx = AppUtils.getMemberIdxBySecurityContext();

        ArticleDto articleDto = new ArticleDto()
                .setArticleTitle(articleCreateDto.articleTitle())
                .setArticleContent(articleCreateDto.articleContent())
                .setTag(articleCreateDto.tag())
                .setMemberIdx(memberIdx);

        return ResponseEntity.ok(articleService.createArticle(articleDto));
    }

    @Operation(summary = "게시글 수정 API")
    @PutMapping("/update")
    public ResponseEntity<?> updateArticle(@RequestBody ArticleUpdateDto articleUpdateDto) {
        log.info("Article Update Request: {}", articleUpdateDto);

        Long memberIdx = AppUtils.getMemberIdxBySecurityContext();

        ArticleDto articleDto = new ArticleDto()
                .setArticleIdx(articleUpdateDto.articleIdx())
                .setArticleTitle(articleUpdateDto.articleTitle())
                .setArticleContent(articleUpdateDto.articleContent())
                .setTag(articleUpdateDto.tag())
                .setMemberIdx(memberIdx);

        return ResponseEntity.ok(articleService.updateArticle(articleDto));
    }

    @Operation(summary = "게시글 선택 삭제 API")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteArticleList(
            @Parameter(description = "게시글 번호") @RequestParam List<Long> articleIdx) {
        log.info("Article Delete Request: {}", articleIdx);
        articleService.deleteArticleList(articleIdx);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게시글 전체 삭제")
    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteAllArticle(@RequestParam Long memberIdx) {
        log.info("Delete All Article Request: {}", memberIdx);
        articleService.deleteAllArticle(memberIdx);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게시글 좋아요 업데이트 API")
    @PostMapping("/like/{articleIdx}")
    public ResponseEntity<?> likeUpdateArticle(@PathVariable Long articleIdx) {
        Long memberIdx = AppUtils.getMemberIdxBySecurityContext();
        log.info("Article Like Update article: {}, member: {}", articleIdx, memberIdx);

        return ResponseEntity.ok(articleService.countArticleUpdate(memberIdx, articleIdx));
    }

}
