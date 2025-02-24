package meme.book.back.oauth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;

    public JwtTokenProvider(@Value("${spring.auth.jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access 토큰 유효 기간 = 1시간
    private static final long ACCESS_TOKEN_PERIOD = 6 * 3_600 * 1_000;

    // Refresh 토큰 유효 기간 = 7일
    private static final long REFRESH_TOKEN_PERIOD =  7 * 24 * 3_600 * 1_000;

    private JwtParser jwtParser() {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build();
    }

    // Access 토큰 생성
    public String createAccessToken(String email) {
        Date nowTime = new Date();

        return Jwts.builder()
                .claim("email", email)
                .subject("AccessToken")
                .signWith(secretKey)
                .expiration(new Date(nowTime.getTime() + ACCESS_TOKEN_PERIOD))
                .compact();
    }

    public String getEmailByToken(String bearerToken) {
        String token = bearerToken.replace("Bearer ", "");

        log.debug("Authorize Token: {}", token);

        Claims claims = null;
        try {
            claims = jwtParser().parseSignedClaims(token).getPayload();
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다: {}", e.getLocalizedMessage());
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다: {}", e.getLocalizedMessage());
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다: {}", e.getLocalizedMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다: {}", e.getLocalizedMessage());
        }
        log.debug("Get Claim By Authorize Token: {}", claims);
        return claims != null ? String.valueOf(claims.get("email")) : null;
    }

}
