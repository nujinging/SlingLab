package meme.book.back.dto.article;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleDto {

    private Long articleIdx;

    private Long memberIdx;

    private String articleTitle;

    private String articleContent;

    private String tag;

    private Long articleLikeCnt;

    private LocalDateTime regDtm;

    public record ArticleCreateDto(String articleTitle, String tag, String articleContent) { }

    public record ArticleUpdateDto(Long articleIdx, String articleTitle, String tag, String articleContent) { }
}
