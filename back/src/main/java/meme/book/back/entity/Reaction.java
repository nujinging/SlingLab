package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import meme.book.back.utils.ActionType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Accessors(chain = true)
@Getter @Setter @ToString
@Entity
@Table(name = "REACTION")
public class Reaction implements Serializable {

    @Serial
    private static final long serialVersionUID = -6197315457446223641L;

    // 반응 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REACTION_IDX")
    private Long reactionIdx;

    // 리액션 타입
    @Enumerated(EnumType.STRING)
    @Column(name = "REACTION_TYPE")
    private ActionType reactionType;

    // 리액션 등록 시간
    @CreatedDate
    @Column(name = "REACTION_REG_DTM")
    private LocalDateTime reactionRegDtm;

    // 리액션 수정 시간
    @LastModifiedDate
    @Column(name = "REACTION_MOD_DTM")
    private LocalDateTime reactionModDtm;

    // 리액션 등록자
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 리액션할 단어
    @Column(name = "TARGET_IDX")
    private Long targetIdx;

}
