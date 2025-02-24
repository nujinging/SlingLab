package meme.book.back.repository.scrap;

import meme.book.back.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long>, ScrapCustomRepository {

    Optional<Scrap> findByWordIdxAndMemberIdx(Long wordIdx, Long memberIdx);

    List<Scrap> findAllByScrapIdxIn(List<Long> scrapIdxList);

    List<Scrap> findAllByMemberIdx(Long memberIdx);
}
