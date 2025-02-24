package meme.book.back.repository.reaction;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReactionRepositoryImpl implements ReactionCustomRepository{

    private final JPAQueryFactory queryFactory;
}
