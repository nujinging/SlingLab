package meme.book.back.dto.scrap;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class ScrapResponseDto {

    private Long scrapIdx;

    private Long memberIdx;

    private Long wordIdx;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime regDtm;

    private String wordName;

    private String nickname;

}
