package meme.book.back.repository.comment;

import meme.book.back.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, CommentCustomRepository {

    Optional<Comment> findByCommentIdx(Long commentIdx);

    List<Comment> findAllByMemberIdxAndDeletedFalse(Long memberIdx);

    List<Comment> findAllByCommentIdxIn(List<Long> commentIdx);

    List<Comment> findAllByDeletedFalseAndCommentIdxIn(List<Long> commentIdx);

    Optional<Comment> findByCommentIdxAndArticleIdx(Long commentIdx, Long articleIdx);

    List<Comment> findAllByArticleIdxIn(List<Long> articleIdxList);

    Page<Comment> findByMemberIdxAndDeletedFalseOrderByCommentIdxDesc(Pageable pageable, Long memberIdx);
}
