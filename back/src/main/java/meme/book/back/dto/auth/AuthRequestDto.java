package meme.book.back.dto.auth;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthRequestDto {

    private String provider = "google";

    private String code;

}
