package meme.book.back.repository.wordContent;

import meme.book.back.entity.WordContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordContentRepository extends JpaRepository<WordContent, Long>, WordContentCustomRepository {

    Optional<WordContent> findByWordIdxAndMemberIdx(Long wordIdx, Long memberIdx);

    Page<WordContent> findByWordIdx(Long wordIdx, Pageable pageable);

    List<WordContent> findAllByWordContentIdxIn(List<Long> wordContentIdx);

    List<WordContent> findAllByMemberIdx(Long memberIdx);
}
