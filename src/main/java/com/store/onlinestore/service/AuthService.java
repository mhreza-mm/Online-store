package com.store.onlinestore.service;

import com.store.onlinestore.dto.AuthResponse;
import com.store.onlinestore.dto.LoginRequest;
import com.store.onlinestore.entity.User.Role;
import com.store.onlinestore.entity.User;
import com.store.onlinestore.repository.UserRepository;
import com.store.onlinestore.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public ResponseEntity<AuthResponse> registerOrLogin(LoginRequest loginRequest) {
        Optional<User> existingUser = userRepository.findByUsername(loginRequest.getUsername());

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            if (!user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity
                        .status(401)
                        .body(AuthResponse.builder()
                                .massage("رمز عبور اشتباه است")
                                .build());
            }


            String token = jwtUtil.generateJwtToken(user.getUsername());
            return ResponseEntity.ok(
                    AuthResponse.builder()
                            .massage("ورود موفقیت‌آمیز")
                            .userId(user.getId())
                            .username(user.getUsername())
                            .token(token)
                            .build()
            );

        } else {

            User newUser = new User();
            newUser.setUsername(loginRequest.getUsername());
            newUser.setPassword(loginRequest.getPassword());
            newUser.setRole(Role.USER);

            User savedUser = userRepository.save(newUser);

            String token = jwtUtil.generateJwtToken(savedUser.getUsername());
            return ResponseEntity.ok(
                    AuthResponse.builder()
                            .massage("ثبت‌نام موفقیت‌آمیز")
                            .userId(savedUser.getId())
                            .username(savedUser.getUsername())
                            .token(token)
                            .build()
            );
        }
    }
}
