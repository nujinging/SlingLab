package meme.book.back.exception;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ErrorResponseDto handleException(CustomException e) {
        HttpStatus status = e.getStatus();
        String message = e.getMessage();

        log.error("[Error] code: {}, status: {}, message: {}", status.value(), status, message);

        return new ErrorResponseDto()
                .setStatus(status)
                .setMessage(message)
                .setCode(status.value());
    }

}
