package meme.book.back.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.ProviderType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter @Getter @ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "MEMBER")
public class Member implements Serializable {

    @Serial
    private static final long serialVersionUID = -4629779128073180218L;

    // 회원 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 회원 Email
    @Column(name = "MEMBER_EMAIL")
    private String memberEmail;

    // 회원 닉네임
    @Column(name = "NICKNAME")
    private String nickname;

    // 프로필 이미지
    @Column(name = "PROFILE_IMG")
    private String profileImg;

    // 소속 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "ORIGIN_NATION")
    private NationCode originNation = NationCode.KOR;

    // 대상 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "TARGET_NATION")
    private NationCode targetNation = NationCode.KOR;

    // 회원 가입일
    @CreatedDate
    @Column(name = "MEMBER_REG_DTM")
    private LocalDateTime memberRegDtm;

    // 로그인 제공자
    @Enumerated(value = EnumType.STRING)
    @Column(name = "PROVIDER")
    private ProviderType provider;

}


