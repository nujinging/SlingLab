package meme.book.back.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.oauth.JwtTokenProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static meme.book.back.utils.Constants.AUTHORIZATION;
import static meme.book.back.utils.Constants.MEMBER_EMAIL;

@Slf4j
@RequiredArgsConstructor
@Component
public class MemberInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        if (request.getHeader(AUTHORIZATION) != null) {
            String authorizationToken = request.getHeader(AUTHORIZATION);
            String email = jwtTokenProvider.getEmailByToken(authorizationToken);

            if (email != null) {
                request.setAttribute(MEMBER_EMAIL, email);
            }
        }
        return true;
    }
}
