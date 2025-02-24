package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordInsertRequestDto {

    // 단어명
    private String wordName;

    // 단어 설명
    private String wordContent;

    // 단어 국가
    private NationCode wordNation;

    // 단어 등록자
    private Long memberIdx;
}
