package meme.book.back.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.exception.CustomException;
import meme.book.back.oauth.JwtTokenProvider;
import meme.book.back.repository.member.MemberRepository;
import meme.book.back.utils.ErrorCode;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try {
            log.debug("Request Method: {}, Filter URL: {}, ", request.getMethod(), request.getRequestURI());

            String authorizationToken = request.getHeader("Authorization");
            if (authorizationToken == null) {
                throw new CustomException(ErrorCode.INVALID_AUTHENTICATION_TOKEN);
            }

            String memberEmail = jwtTokenProvider.getEmailByToken(authorizationToken);

            if (memberEmail == null) {
                throw new CustomException(ErrorCode.INVALID_AUTHENTICATION_TOKEN);
            }

            long memberIdx = memberRepository.findByMemberEmail(memberEmail)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER))
                    .getMemberIdx();

            UserDetails userDetails = User.builder()
                    .username(String.valueOf(memberIdx))
                    .password(memberEmail)
                    .build();

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);

        } catch (ServletException | IOException exception) {
            log.error("### Filter Exception: {}", exception.getLocalizedMessage());
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String[] excludePath = {"/auth/login", "/swagger-ui", "/swagger", "/v3/api-docs", "/docs", "/", "/index.html"};
        String httpMethod = request.getMethod();
        String path = request.getRequestURI();

        log.debug("Http Method: {}, Path: {}", httpMethod, path);

        return httpMethod.equals("GET") || Arrays.asList(excludePath).contains(path);
    }

}
