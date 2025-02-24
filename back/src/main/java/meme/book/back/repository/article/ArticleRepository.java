package meme.book.back.repository.article;

import meme.book.back.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {

    Optional<Article> findByArticleIdx(Long articleIdx);

    List<Article> findAllByArticleIdxIn(List<Long> articleIdxList);

    List<Article> findAllByMemberIdx(Long memberIdx);

}
