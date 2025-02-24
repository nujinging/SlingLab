package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.entity.Word;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.service.WordService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@SpringBootTest
public class WordTest {

    @Autowired
    WordService wordService;

    @Autowired
    WordRepository wordRepository;

    @Test
    void selectedWordDelete() {
        wordService.deleteWordContentList(List.of(114L, 113L));
    }

    @Test
    void test() {
        List<Word> wordList = wordRepository.getWordListByNotExistContent(List.of(196L));
        log.info("{}", wordList.size());
        wordList.forEach(word -> log.info("{}", word));
    }
}
