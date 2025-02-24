package meme.book.back.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.auth.LoginResponseDto;
import meme.book.back.dto.member.MemberDto;
import meme.book.back.dto.member.MemberLoginDto;
import meme.book.back.exception.CustomException;
import meme.book.back.oauth.JwtTokenProvider;
import meme.book.back.oauth.JwtTokenVerifier;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.ProviderType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {

    private final JwtTokenVerifier tokenVerifier;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    public LoginResponseDto memberLogin(String code) {
        String jwtAccessToken;

        GoogleIdToken googleIdToken;
        try {
            googleIdToken = tokenVerifier.getGoogleTokenVerifier().verify(code);
        } catch (GeneralSecurityException | IOException e) {
            log.error("Login Fail: {}", e.getLocalizedMessage());
            throw new CustomException(ErrorCode.FAILED_LOGIN);
        }

        if (googleIdToken == null) {
            throw new CustomException(ErrorCode.FAILED_LOGIN);
        }

        Payload payload = googleIdToken.getPayload();

        String name = String.valueOf(payload.get("name"));
        String profileImg = String.valueOf(payload.get("picture"));

        MemberLoginDto memberLoginDto = new MemberLoginDto()
                .setEmail(payload.getEmail())
                .setNickname(name)
                .setProfileImg(profileImg)
                .setProvider(ProviderType.GOOGLE);

        MemberDto memberDto = memberService.findOrCreateMember(memberLoginDto);

        jwtAccessToken = jwtTokenProvider.createAccessToken(memberDto.getMemberEmail());

        log.debug("Login Member Info: {}", memberDto);
        log.info("Create JWT Access Token: {}", jwtAccessToken);


        return new LoginResponseDto()
                .setMemberIdx(memberDto.getMemberIdx())
                .setAccessToken(jwtAccessToken);
    }
}
