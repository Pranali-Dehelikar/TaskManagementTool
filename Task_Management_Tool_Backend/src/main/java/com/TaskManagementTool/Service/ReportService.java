package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Repository.TaskRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private TaskRepository taskRepository;

    public void generatePdf(OutputStream os) {
        try {
            List<Task> tasks = taskRepository.findAll();
            Document doc = new Document(PageSize.A4);
            PdfWriter.getInstance(doc, os);
            doc.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Task Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            doc.add(title);
            doc.add(Chunk.NEWLINE);

            Map<String, Long> summary =
                    tasks.stream().collect(Collectors.groupingBy(Task::getStatus, Collectors.counting()));

            doc.add(new Paragraph("Summary"));
            doc.add(new Paragraph("TODO: " + summary.getOrDefault("TODO", 0L)));
            doc.add(new Paragraph("IN_PROGRESS: " + summary.getOrDefault("IN_PROGRESS", 0L)));
            doc.add(new Paragraph("DONE: " + summary.getOrDefault("DONE", 0L)));
            doc.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);

            addHeader(table, "ID");
            addHeader(table, "Title");
            addHeader(table, "Description");
            addHeader(table, "Status");

            for (Task t : tasks) {
                table.addCell(String.valueOf(t.getId()));
                table.addCell(t.getTitle());
                table.addCell(t.getDescription());
                table.addCell(t.getStatus());
            }

            doc.add(table);
            doc.close();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void addHeader(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text));
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        table.addCell(cell);
    }
}
