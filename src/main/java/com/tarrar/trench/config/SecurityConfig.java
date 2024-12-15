package com.tarrar.trench.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */

@Configuration
public class SecurityConfig {

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	 @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	            .authorizeHttpRequests()
	                .requestMatchers("/api/**").permitAll() // Allow all API requests
	                .anyRequest().permitAll() // Allow all other requests
	                .and()
	            .csrf().disable(); // Disable CSRF for simplicity during testing
	        return http.build();
	    }
}

