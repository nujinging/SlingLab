package meme.book.back.dto.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleTokenDto {

    private String accessToken;

    private String refreshToken;

    private int expiresIn;

    private String tokenType;

    private String idToken;
}
