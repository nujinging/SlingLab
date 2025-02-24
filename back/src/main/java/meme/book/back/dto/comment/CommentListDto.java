package meme.book.back.dto.comment;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class CommentListDto {

    List<CommentResponseDto> commentList;

    long totalCount;

    long totalPage;
}
