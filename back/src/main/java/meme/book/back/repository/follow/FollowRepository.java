package meme.book.back.repository.follow;

import meme.book.back.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository {

    Optional<Follow> findByFollowerAndFollowee(Long follower, Long followee);

    boolean existsByFollowerAndFollowee(Long me, Long other);

    void deleteByFollowIdx(Long followIdx);
}
