package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.ChatRequest;
import com.TaskManagementTool.DTO.ChatResponse;
import com.TaskManagementTool.Service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestParam("message") String message) {
        String response = openAIService.getChatResponse(message);
        return ResponseEntity.ok(response);
    }
}