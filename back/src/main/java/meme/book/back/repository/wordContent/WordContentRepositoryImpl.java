package meme.book.back.repository.wordContent;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.word.WordContentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QWord.word;
import static meme.book.back.entity.QWordContent.wordContent;


@RequiredArgsConstructor
public class WordContentRepositoryImpl implements WordContentCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<WordContentDto> getWordContentListByMemberIdx(Pageable pageable, Long memberIdx) {

        List<WordContentDto> fetch = queryFactory.select(
                        Projections.fields(WordContentDto.class,
                                wordContent.wordContentIdx.as("wordContentIdx"),
                                wordContent.wordIdx.as("wordIdx"),
                                word.wordName.as("wordName"),
                                wordContent.memberIdx.as("memberIdx"),
                                wordContent.content.as("content"),
                                wordContent.contentLike.as("contentLike"),
                                wordContent.contentDislike.as("contentDislike")
                        )
                )
                .from(wordContent)
                .innerJoin(word).on(wordContent.wordIdx.eq(word.wordIdx))
                .where(wordContent.memberIdx.eq(memberIdx))
                .orderBy(wordContent.wordContentIdx.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(wordContent.count())
                .from(wordContent)
                .innerJoin(word).on(wordContent.wordIdx.eq(word.wordIdx))
                .where(wordContent.memberIdx.eq(memberIdx));

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }
}