package meme.book.back.dto.scrap;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ScrapRequestDto {

    private Long wordIdx;

    private Long memberIdx;

}
