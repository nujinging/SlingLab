package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordListDto {

    // 단어 고유 번호
    private Long wordIdx;

    // 단어명
    private String wordName;

    // 단어 설명
    private String wordContent;

    // 단어 국가
    private NationCode wordNation;

    // 좋아요 수
    private long likeCount;

    // 싫어요 수
    private long dislikeCount;

    // 스크랩 여부
    private boolean isScrap;

    // 단어 설명 카운트
    private long wordContentCount;
}
