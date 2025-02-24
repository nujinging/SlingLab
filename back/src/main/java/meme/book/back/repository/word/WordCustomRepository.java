package meme.book.back.repository.word;

import meme.book.back.dto.word.WordRequestDto;
import meme.book.back.dto.word.WordListDto;
import meme.book.back.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface WordCustomRepository {

    Page<WordListDto> getAllWordList(Pageable pageable, WordRequestDto requestDto);

    List<Word> getWordListByNotExistContent(List<Long> wordIdxList);
}
