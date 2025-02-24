package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.service.ScrapService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Transactional
@SpringBootTest
public class ScrapTest {

    @Autowired
    ScrapService scrapService;

    @Test
    void scrapDeleteTest() {
        scrapService.deleteWordScrapList(List.of(52L, 58L));
    }
}
