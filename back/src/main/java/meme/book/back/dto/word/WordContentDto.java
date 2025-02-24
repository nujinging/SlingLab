package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.WordContent;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordContentDto {

    private Long wordContentIdx;

    private Long wordIdx;

    private Long scrapIdx;

    private String wordName;

    private Long memberIdx;

    private String content;

    private Long contentLike;

    private Long contentDislike;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regDtm;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modDtm;

    public static Page<WordContentDto> toPageDto(Page<WordContent> wordContentList) {
        return wordContentList.map(w -> new WordContentDto()
                .setWordContentIdx(w.getWordContentIdx())
                .setWordIdx(w.getWordIdx())
                .setMemberIdx(w.getMemberIdx())
                .setContent(w.getContent())
                .setContentLike(w.getContentLike())
                .setContentDislike(w.getContentDislike())
                .setRegDtm(w.getRegDtm())
                .setModDtm(w.getModDtm())
        );
    }
}
