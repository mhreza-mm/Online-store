package com.store.onlinestore.service;

import com.store.onlinestore.dto.AuthResponse;
import com.store.onlinestore.dto.LoginRequest;
import com.store.onlinestore.entity.User;
import com.store.onlinestore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public ResponseEntity<AuthResponse> registerOrLogin(LoginRequest loginRequest) {
        Optional<User> existingUser = userRepository.findByUsername(loginRequest.getUsername());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if(!user.getPassword().equals(loginRequest.getPassword())){
                return ResponseEntity
                        .status(401)
                        .body(AuthResponse.builder()
                                .massage("رمز عبور اشتباه است ")
                                .build()
                        );


            }
            return ResponseEntity.ok(
                    AuthResponse.builder()
                        .massage("ورود موفقیت آمیز ")
                        .userId(user.getId())
                        .username(user.getUsername())

                            .build()
            );
        }else {
            User newUser = new User();
            newUser.setUsername(loginRequest.getUsername());
            newUser.setPassword(loginRequest.getPassword());

            User savedUser = userRepository.save(newUser);

            return ResponseEntity.ok(
                    AuthResponse.builder()
                            .massage("ثبت نام موفقیت آمیز ")
                            .userId(savedUser.getId())
                            .username(savedUser.getUsername())
                            .build()
            );
        }



    }
}
