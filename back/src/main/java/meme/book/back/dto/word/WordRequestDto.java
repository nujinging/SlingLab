package meme.book.back.dto.word;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;

@Data
@Accessors(chain = true)
public class WordRequestDto {

    private NationCode nationCode;

    private String search;

    private SortType sort;

    private String sortBy;

}
