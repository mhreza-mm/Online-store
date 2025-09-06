package com.store.onlinestore.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String massage;
    private Long userId;
    private String username;

}
