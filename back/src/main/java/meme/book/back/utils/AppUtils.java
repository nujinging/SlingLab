package meme.book.back.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AppUtils {

    /* 로그인된 회원이 아닌 경우 */
    private static final String ANONYMOUS_USER = "anonymousUser";

    /**
     * @return 회원 이메일 정보
     */
    public static Long getMemberIdxBySecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberIdx = authentication.getName();

        return memberIdx.equals(ANONYMOUS_USER) ? null : Long.parseLong(memberIdx);
    }

}
