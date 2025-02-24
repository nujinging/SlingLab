package meme.book.back.repository.wordContent;

import meme.book.back.dto.word.WordContentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordContentCustomRepository {

    Page<WordContentDto> getWordContentListByMemberIdx(Pageable pageable, Long memberIdx);
}
