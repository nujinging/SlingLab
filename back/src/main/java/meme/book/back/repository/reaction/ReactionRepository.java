package meme.book.back.repository.reaction;

import meme.book.back.entity.Reaction;
import meme.book.back.utils.ActionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long>, ReactionCustomRepository {

    Optional<Reaction> findReactionByMemberIdxAndTargetIdx(Long memIdx, Long targetIdx);

    Optional<Reaction> findByReactionTypeAndTargetIdx(ActionType actionType, Long targetIdx);
}
