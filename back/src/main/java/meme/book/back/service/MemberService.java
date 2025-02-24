package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.member.MemberDto;
import meme.book.back.dto.member.MemberLoginDto;
import meme.book.back.entity.Member;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.member.MemberRepository;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.NationCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 중복 닉네임 체크
    @Transactional(readOnly = true)
    public boolean isExistNickname(String nickname) {
        boolean isExist = memberRepository.existsByNickname(nickname);
        log.info("### Check Member nickname: {}, Exist: {}", nickname, isExist);

        return memberRepository.existsByNickname(nickname);
    }

    // 회원 닉네임 수정
    @Transactional
    public String saveNickname(MemberDto memberDto) {
        String nickname = memberDto.getNickname();

        if (isExistNickname(nickname)) {
            log.info("### 이미 존재하는 닉네임입니다. Nickname: {}", nickname);
            throw new CustomException(ErrorCode.ALREADY_EXIST_NICKNAME);
        }

        Member member = memberRepository.findByMemberIdx(memberDto.getMemberIdx())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        member.setNickname(nickname);
        memberRepository.save(member);

        log.info("### Complete Save Nickname: {}", nickname);
        return nickname;
    }

    // 회원 정보 조회
    @Transactional(readOnly = true)
    public MemberDto getMemberInfo(Long memberIdx) {
        Member member = memberRepository.findByMemberIdx(memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        log.info("### member: {}", member);

        return MemberDto.toDto(member);
    }

    // 회원 국가 변경
    @Transactional
    public MemberDto updateNation(MemberDto memberDto) {
        Long memberIdx = memberDto.getMemberIdx();
        NationCode originNation = memberDto.getOriginNation();
        NationCode targetNation = memberDto.getTargetNation();

        Member member = memberRepository.findByMemberIdx(memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        member.setOriginNation(originNation)
              .setTargetNation(targetNation);
        memberRepository.save(member);

        log.info("### Complete update Nation: memberIdx: {}, origin nation: {}, target nation: {}",
                memberIdx, originNation, targetNation);

        return memberDto;

    }

    // 회원 조회 or 생성
    @Transactional
    public MemberDto findOrCreateMember(MemberLoginDto memberLoginDto) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberLoginDto.getEmail());

        MemberDto memberDto;

        if (optionalMember.isPresent()) {
            memberDto = MemberDto.toDto(optionalMember.get());
            log.info("Exist Member: {}", memberDto);
        } else {
            Member member = new Member()
                    .setMemberEmail(memberLoginDto.getEmail())
                    .setProfileImg(memberLoginDto.getProfileImg())
                    .setProvider(memberLoginDto.getProvider());

            memberRepository.save(member);

            memberDto = MemberDto.toDto(member);
            log.info("Create new Member: {}", memberDto);
        }

        return memberDto;
    }

    @Transactional
    public void deleteMember(Long memberIdx) {
        Member member = memberRepository.findByMemberIdx(memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        memberRepository.delete(member);

        log.info("### Delete Member: {}", member);
    }

}
