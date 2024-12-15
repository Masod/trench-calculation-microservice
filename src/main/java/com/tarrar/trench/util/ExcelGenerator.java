package com.tarrar.trench.util;


import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;


/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */


public class ExcelGenerator {
	
	
	/**
	 * 
	 * @param results
	 * @return
	 * @throws IOException
	 */
    public static byte[] generateExcel(Map<String, Object> results) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Trench Results");

        // Create Header Row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Violation", "Trench Width", "Trench Depth"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            style.setFont(font);
            cell.setCellStyle(style);
        }

        /**
         * 
         */
        // Add Data
        @SuppressWarnings("unchecked")
        List<String> violations = (List<String>) results.get("violations");
        int rowIndex = 1;
        for (String violation : violations) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(violation);
        }

        Row widthRow = sheet.createRow(rowIndex++);
        widthRow.createCell(1).setCellValue("Trench Width");
        widthRow.createCell(2).setCellValue((Integer) results.get("finalTrenchWidth"));

        Row depthRow = sheet.createRow(rowIndex);
        depthRow.createCell(1).setCellValue("Trench Depth");
        depthRow.createCell(2).setCellValue((Integer) results.get("finalTrenchDepth"));

        // Write to ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }
}
