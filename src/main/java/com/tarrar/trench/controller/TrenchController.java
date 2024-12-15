package com.tarrar.trench.controller;


import com.tarrar.trench.service.TrenchService;
import com.tarrar.trench.util.ExcelGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */

@RestController
@RequestMapping("/api/trench")
@CrossOrigin(origins = "http://masood-domain.com:3000")
public class TrenchController {

    @Autowired
    private TrenchService trenchService;

    /**
     * 
     * @param input
     * @return
     */
    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateTrench(@RequestBody Map<String, Object> input) {
        try {
        	
        	String type = (String) input.get("type");
            if ("".equals(type)) {
            	 Map<String, Object> errorResponse = new HashMap<>();
                 errorResponse.put("violations", List.of("Error processing request"));
                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
            }
            
            Map<String, Object> results = trenchService.calculateTrenchViolations(
                (String) input.get("trenchType"),
                (List<Map<String, Object>>) input.get("conduits")
            );
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("violations", List.of("Error processing request"));
            errorResponse.put("finalTrenchWidth", "N/A");
            errorResponse.put("finalTrenchDepth", "N/A");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    
    /**
     * 
     * @param results
     * @return
     */
    @PostMapping("/excel")
    public ResponseEntity<byte[]> generateExcel(@RequestBody Map<String, Object> results) {
        System.out.println("Received Results: " + results); // Debug log
        if (results == null || results.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return 400 Bad Request for missing body
        }

        try {
            byte[] excelData = ExcelGenerator.generateExcel(results);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=trench_results.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(excelData);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 
     * @return
     */
    @GetMapping("/test")
    public String testEndpoint() {
        return "Trench Calculation Microservice is running!";
    }
    
    /**
     * 
     * @return
     */
    @GetMapping(value = {"/", "/{path:[^\\.]*}"})
    public String forwardToReact() {
        return "index.html";
    }
}
