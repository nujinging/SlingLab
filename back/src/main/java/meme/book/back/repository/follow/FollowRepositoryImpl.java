package meme.book.back.repository.follow;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.follow.FollowResponseDto;
import meme.book.back.entity.QFollow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QFollow.follow;

@RequiredArgsConstructor
public class FollowRepositoryImpl implements FollowCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<FollowResponseDto> getFollowList(Long memberIdx, Pageable pageable, boolean isFollower) {

        List<FollowResponseDto> fetch = queryFactory.select(
                        Projections.fields(FollowResponseDto.class,
                                follow.followIdx.as("followIdx"),
                                follow.follower.as("follower"),
                                follow.follower.as("followee")
                        )
                )
                .from(follow)
                .where(followCondition(memberIdx, isFollower))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(follow.count())
                .from(follow)
                .where(follow.followee.eq(memberIdx));

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }

    private BooleanExpression followCondition(Long memberIdx, boolean isFollower) {
        return isFollower ? follow.follower.eq(memberIdx) : follow.followee.eq(memberIdx);
    }

}
