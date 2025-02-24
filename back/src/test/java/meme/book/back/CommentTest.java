package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.service.CommentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Slf4j
@Transactional
public class CommentTest {

    @Autowired
    CommentService commentService;

    @Test
    void commentDeleteTest() {
        commentService.deleteCommentList(List.of(45L, 57L));

    }
}
