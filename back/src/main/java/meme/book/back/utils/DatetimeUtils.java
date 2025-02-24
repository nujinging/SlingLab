package meme.book.back.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DatetimeUtils {

    public static String getNowDatetime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.now().format(formatter);
    }

}
