package meme.book.back.repository.scrap;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.scrap.ScrapResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QMember.member;
import static meme.book.back.entity.QScrap.scrap;
import static meme.book.back.entity.QWord.word;

@RequiredArgsConstructor
public class ScrapCustomRepositoryImpl implements ScrapCustomRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ScrapResponseDto> getScrapListByMemberIdx(Pageable pageable, Long memberIdx) {

        List<ScrapResponseDto> fetch = queryFactory.select(
                        Projections.fields(ScrapResponseDto.class,
                                scrap.scrapIdx.as("scrapIdx"),
                                scrap.memberIdx.as("memberIdx"),
                                scrap.wordIdx.as("wordIdx"),
                                scrap.regDtm.as("regDtm"),
                                word.wordName.as("wordName"),
                                member.nickname.as("nickname")
                        )
                )
                .from(scrap)
                .innerJoin(word).on(scrap.wordIdx.eq(word.wordIdx))
                .innerJoin(member).on(scrap.memberIdx.eq(member.memberIdx))
                .where(scrap.memberIdx.eq(memberIdx))
                .fetch();

        JPAQuery<Long> count = queryFactory.select(scrap.count())
                .from(scrap)
                .innerJoin(word).on(scrap.wordIdx.eq(word.wordIdx))
                .innerJoin(member).on(scrap.memberIdx.eq(member.memberIdx))
                .where(scrap.memberIdx.eq(memberIdx));

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }

}
