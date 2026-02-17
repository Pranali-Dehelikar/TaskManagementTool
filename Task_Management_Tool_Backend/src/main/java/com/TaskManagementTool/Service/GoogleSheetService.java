package com.TaskManagementTool.Service;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class GoogleSheetService {

    // Simulate fetching score from Google Sheet
    public int fetchScoreFromGoogleForm(String formUrl) {

        // Replace this logic with Google Sheets API
        Random random = new Random();
        return random.nextInt(10); // 0–9 score
    }
}
