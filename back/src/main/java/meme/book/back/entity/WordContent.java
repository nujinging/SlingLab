package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter @Getter @ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "WORD_CONTENT")
public class WordContent implements Serializable {

    @Serial
    private static final long serialVersionUID = -708423299329810329L;

    // 단어 내용 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_CONTENT_IDX")
    private Long wordContentIdx;

    // 단어 고유 번호
    @Column(name = "WORD_IDX")
    private Long wordIdx;

    // 회원 번호
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 단어 설명
    @Column(name = "CONTENT")
    private String content;

    // 내용 좋아요 수
    @Column(name = "CONTENT_LIKE")
    private Long contentLike = 0L;

    // 내용 싫어요 수
    @Column(name = "CONTENT_DISLIKE")
    private Long contentDislike = 0L;

    // 생성 일자
    @CreationTimestamp
    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;

    // 수정 일자
    @UpdateTimestamp
    @Column(name = "MOD_DTM")
    private LocalDateTime modDtm;

}
