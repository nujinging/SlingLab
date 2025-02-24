package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.service.ArticleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@SpringBootTest
@WithMockUser
public class ArticleTest {

    @Autowired
    ArticleService articleService;

    @Test
    void articleDeleteTest() {
        articleService.deleteArticleList(List.of(20L, 21L));
        log.info("");
    }
}
