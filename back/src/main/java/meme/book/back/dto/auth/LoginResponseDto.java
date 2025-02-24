package meme.book.back.dto.auth;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginResponseDto {

    String accessToken;

    long memberIdx;

}
