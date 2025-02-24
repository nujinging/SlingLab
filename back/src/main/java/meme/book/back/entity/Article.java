package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "ARTICLE")
public class Article implements Serializable {

    @Serial
    private static final long serialVersionUID = 5461100439363121154L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ARTICLE_IDX")
    private Long articleIdx;

    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    @Column(name = "ARTICLE_TITLE")
    private String articleTitle;

    @Column(name = "ARTICLE_CONTENT")
    private String articleContent;

    @Column(name = "TAG")
    private String tag;

    @Column(name = "ARTICLE_LIKE_CNT")
    private Long articleLikeCnt = 0L;

    @CreatedDate
    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;
}
