package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.ColumnDefault;
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
@Table(name = "COMMENT")
public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = -3119386006593551362L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_IDX")
    private Long commentIdx;

    @Column(name = "COMMENT_CONTENT")
    private String commentContent;

    @Column(name = "ARTICLE_IDX")
    private Long articleIdx;

    @Column(name = "COMMENT_LIKE_CNT")
    private Long commentLikeCnt = 0L;

    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    @CreatedDate
    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;

    @Column(name = "UPPER_IDX")
    private Long upperIdx;

    @Column(name = "DELETED")
    private boolean deleted = false;
}

