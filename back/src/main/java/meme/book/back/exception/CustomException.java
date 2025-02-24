package meme.book.back.exception;

import lombok.Getter;
import lombok.ToString;
import meme.book.back.utils.ErrorCode;
import org.springframework.http.HttpStatus;

import java.io.Serial;

@Getter
@ToString
public class CustomException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 7896145838732239393L;

    private final HttpStatus status;
    private final String message;

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.status = errorCode.getStatus();
        this.message = errorCode.getMessage();
    }

}
