package meme.book.back.repository.comment;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.comment.CommentDto;

import java.util.List;

import static meme.book.back.entity.QComment.comment;
import static meme.book.back.entity.QMember.member;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<CommentDto> getCommentList(Long articleIdx) {

        return queryFactory.select(Projections.fields(CommentDto.class,
                        comment.commentIdx.as("commentIdx"),
                        comment.commentContent.as("commentContent"),
                        comment.commentLikeCnt.as("likeCount"),
                        member.nickname.as("nickname"),
                        member.memberIdx.as("commentMemberIdx"),
                        comment.upperIdx.as("upperIdx"),
                        comment.regDtm.as("commentRegDtm"),
                        comment.deleted.as("deleted")
                ))
                .from(comment)
                .leftJoin(member).on(comment.memberIdx.eq(member.memberIdx))
                .where(comment.articleIdx.eq(articleIdx))
                .orderBy(comment.commentIdx.desc())
                .fetch();
    }
}
