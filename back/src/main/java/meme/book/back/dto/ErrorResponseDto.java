package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.http.HttpStatus;

@Data
@Accessors(chain = true)
public class ErrorResponseDto {

    private HttpStatus status;

    private String message;

    private int code;

}
