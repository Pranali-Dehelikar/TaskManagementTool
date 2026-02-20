package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.ChatRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatResponse(ChatRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);  // Correct Bearer token

        // OpenAI expects {"model": "...", "messages": [{"role": "user", "content": "text"}]}
        Map<String, Object> payload = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", Collections.singletonList(
                        Map.of("role", "user", "content", request.getMessage())
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                entity,
                Map.class
        );

        // Extract the assistant reply
        Object choices = response.getBody().get("choices");
        if (choices instanceof java.util.List && !((java.util.List<?>) choices).isEmpty()) {
            Map firstChoice = (Map) ((java.util.List<?>) choices).get(0);
            Map message = (Map) firstChoice.get("message");
            return (String) message.get("content");
        }

        return "No response from OpenAI.";
    }
}