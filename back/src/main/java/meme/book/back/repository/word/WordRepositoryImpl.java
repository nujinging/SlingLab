package meme.book.back.repository.word;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.word.WordListDto;
import meme.book.back.dto.word.WordRequestDto;
import meme.book.back.entity.Word;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QWord.word;
import static meme.book.back.entity.QWordContent.wordContent;

@RequiredArgsConstructor
public class WordRepositoryImpl implements WordCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<WordListDto> getAllWordList(Pageable pageable, WordRequestDto dto) {

        List<WordListDto> fetch = queryFactory.select(
                        Projections.fields(WordListDto.class,
                                word.wordIdx.as("wordIdx"),
                                word.wordNation.as("wordNation"),
                                word.wordName.as("wordName"),
                                word.wordLike.as("likeCount"),
                                word.wordDislike.as("dislikeCount"),
                                wordContent.count().as("wordContentCount")
                        )
                )
                .from(word)
                .leftJoin(wordContent).on(word.wordIdx.eq(wordContent.wordIdx))
                .where(nationEq(dto.getNationCode()), titleEq(dto.getSearch()))
                .orderBy(dynamicSort(dto.getSort(), dto.getSortBy()))
                .groupBy(word.wordIdx)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(word.count())
                .from(word)
                .where(nationEq(dto.getNationCode()), titleEq(dto.getSearch()));

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }

    private BooleanExpression nationEq(NationCode nationCode) {
        return nationCode == null ? null : word.wordNation.eq(nationCode);
    }

    private BooleanExpression titleEq(String search) {
        return search != null ? word.wordName.contains(search) : null;
    }

    private OrderSpecifier<?> dynamicSort(SortType sort, String sortBy) {
        Order order = (sortBy == null || sortBy.equals("desc")) ? Order.DESC : Order.ASC;

        if (sort == null) {
            return new OrderSpecifier<>(order, word.wordIdx);
        }

        return switch (sort) {
            case LIKE -> new OrderSpecifier<>(order, word.wordLike);
            case DISLIKE -> new OrderSpecifier<>(order, word.wordDislike);
            default -> new OrderSpecifier<>(order, word.wordIdx);
        };
    }

    @Override
    public List<Word> getWordListByNotExistContent(List<Long> wordIdxList) {
        return queryFactory.select(word)
                .from(word)
                .leftJoin(wordContent).on(word.wordIdx.eq(wordContent.wordIdx))
                .where(wordContent.wordContentIdx.isNull()
                        .and(word.wordIdx.in(wordIdxList))
                )
                .fetch();
    }
}
