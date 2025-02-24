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
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @ToString
@Entity
@Table(name = "SCRAP")
public class Scrap implements Serializable {

    @Serial
    private static final long serialVersionUID = -8048192602692422689L;

    // 스크랩 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SCRAP_IDX")
    private Long scrapIdx;

    // 스크랩 등록 단어 (번호)
    @Column(name = "WORD_IDX")
    private Long wordIdx;

    // 스크랩 등록 회원
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 스크랩 등록 시간
    @CreatedDate
    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;

}
