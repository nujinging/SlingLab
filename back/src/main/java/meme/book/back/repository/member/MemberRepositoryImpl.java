package meme.book.back.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberCustomRepository{

    private final JPAQueryFactory queryFactory;


}
