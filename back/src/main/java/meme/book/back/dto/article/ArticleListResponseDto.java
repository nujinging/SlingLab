package meme.book.back.dto.article;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class ArticleListResponseDto {

    List<ArticleListDto> articleList;

    long totalCount;

    int totalPage;

}
