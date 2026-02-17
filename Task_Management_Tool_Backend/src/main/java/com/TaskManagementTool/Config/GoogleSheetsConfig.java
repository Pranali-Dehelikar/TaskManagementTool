package com.TaskManagementTool.Config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.util.Collections;

@Configuration
public class GoogleSheetsConfig {

    @Bean
    public Sheets sheetsService() throws Exception {

        GoogleCredentials credentials = GoogleCredentials
                .fromStream(new FileInputStream("src/main/resources/credentials.json"))
                .createScoped(Collections.singleton(SheetsScopes.SPREADSHEETS));

        HttpRequestInitializer requestInitializer =
                new com.google.auth.http.HttpCredentialsAdapter(credentials);

        return new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                requestInitializer)
                .setApplicationName("Task Management")
                .build();
    }
}
