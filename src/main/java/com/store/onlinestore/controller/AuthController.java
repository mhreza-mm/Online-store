package com.store.onlinestore.controller;

import com.store.onlinestore.dto.AuthResponse;
import com.store.onlinestore.dto.LoginRequest;
import com.store.onlinestore.entity.User;
import com.store.onlinestore.repository.UserRepository;
import com.store.onlinestore.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;


    @GetMapping("/count")
    public Long getUserCount(){
        return userRepository.count();
    }
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return
    userRepository.findAll();
    }

    @PostMapping("/register-or-login")
    public ResponseEntity<AuthResponse> registerOrLogin(@RequestBody LoginRequest loginRequest) {
        return authService.registerOrLogin(loginRequest);
    }
}
