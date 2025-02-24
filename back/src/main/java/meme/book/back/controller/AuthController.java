package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.auth.AuthRequestDto;
import meme.book.back.dto.auth.LoginResponseDto;
import meme.book.back.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody AuthRequestDto authRequest) {

        log.debug("Authenticate Request: {}", authRequest);

        LoginResponseDto loginResponseDto = authService.memberLogin(authRequest.getCode());

        return ResponseEntity.ok(loginResponseDto);
    }
}
