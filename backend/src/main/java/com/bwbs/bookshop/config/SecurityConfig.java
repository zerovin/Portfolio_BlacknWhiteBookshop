package com.bwbs.bookshop.config;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {
	@Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/member/**").permitAll()
                .requestMatchers("/main/**").permitAll()
                .requestMatchers("/book/**").permitAll()
                .requestMatchers("/cart/**").permitAll()
                .requestMatchers("/pickup/**").permitAll()
                .requestMatchers("/board/**").permitAll()
                .requestMatchers("/qna/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/mypage/**").permitAll()
                .requestMatchers("/admin/**").permitAll()
                .anyRequest().authenticated() 
                //.anyRequest().permitAll()
            )
            .formLogin(withDefaults())
			.exceptionHandling(ex -> ex
				.defaultAuthenticationEntryPointFor(
					(request, response, authException) -> {
						response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
						response.setContentType("application/json");
						response.getWriter().write("{\"error\": \"로그인이 필요합니다.\"}");
					},
					new AntPathRequestMatcher("/mypage/**")
				)
				.accessDeniedHandler((request, response, accessDeniedException) -> {
	                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	                response.setContentType("application/json;charset=UTF-8");
	                response.getWriter().write("{\"error\": \"비밀번호를 확인해주세요.\"}");
	            })
			)
			.formLogin(login -> login.disable());

        return http.build();
    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setExposedHeaders(Arrays.asList("Content-Disposition"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
