package com.tarrar.trench.service;


import java.util.*;


/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */


import org.springframework.stereotype.Service;
@Service
public class TrenchService {

	
	/**
	 * 
	 */
    // Standard trench allotments (width x depth in inches)
    private static final Map<String, int[]> TRENCH_ALLOTMENTS = Map.ofEntries(
            Map.entry("Gas Distribution", new int[]{5, 5}),
            Map.entry("Gas Service", new int[]{3, 3}),
            Map.entry("Telephone Distribution", new int[]{5, 7}),
            Map.entry("Telephone Service", new int[]{3, 3}),
            Map.entry("CATV Distribution", new int[]{5, 7}),
            Map.entry("CATV Service", new int[]{3, 3}),
            Map.entry("Secondary Electric Distribution", new int[]{5, 5}),
            Map.entry("Secondary Electric Service", new int[]{4, 4}),
            Map.entry("Primary Electric Distribution", new int[]{7, 7}),
            Map.entry("Primary Electric Service", new int[]{5, 5}),
            Map.entry("Primary and Secondary Electric Distribution", new int[]{7, 17}),
            Map.entry("Streetlight Distribution", new int[]{3, 3}),
            Map.entry("Streetlight Service", new int[]{3, 3}),
            Map.entry("Fiber Distribution", new int[]{5, 7}),
            Map.entry("Fiber Service", new int[]{3, 3})
        );

    /**
     * 
     */
    // Minimum separations in inches (horizontal and vertical)
    private static final Map<String, Double> SEPARATIONS = Map.of(
        "Primary to Primary", 2.0,
        "Primary to Secondary", 2.0,
        "Primary to Streetlight", 12.0,
        "Secondary to Secondary", 1.5,
        "Electric to Non-Electric", 12.0,
        "Gas to Other", 12.0
    );

    /**
     * 
     * @param trenchType
     * @param conduits
     * @return
     */
    public Map<String, Object> calculateTrenchViolations(String trenchType, List<Map<String, Object>> conduits) {
        List<String> violations = new ArrayList<>();
        double totalWidth = 0; // Accumulated trench width
        double totalDepth = 0; // Accumulated trench depth
        double electricDepth = 0; // Depth for electrical conduits
        double nonElectricDepth = 0; // Depth for non-electrical conduits
        Map<String, Object> results = new HashMap<>();

        for (Map<String, Object> conduit : conduits) {
            String type = (String) conduit.get("type");
            List<Double> sizes = parseSizes(conduit.get("sizes"));
          
            int count = Integer.valueOf( !"".equals((String) conduit.get("count")) ? (String) conduit.get("count") : "0");

            // Allotment for the conduit type
            int[] allotment = TRENCH_ALLOTMENTS.getOrDefault(type, new int[]{0, 0});
            double maxWidth = allotment[0];
            double maxDepth = allotment[1];
 
            // Horizontal and vertical dimensions for this conduit type
            double horizontalWidth = 0;
            double verticalHeight = 0;

            for (double size : sizes) {
                double adjustedSize = adjustSize(size);

                if (count > 3) {
                    // Stack conduits if there are more than 3
                    verticalHeight = Math.ceil(count / 2.0) * adjustedSize;
                    horizontalWidth = 2 * adjustedSize; // Two stacks side-by-side
                } else {
                    // Side-by-side placement
                    horizontalWidth = count * adjustedSize;
                    verticalHeight = adjustedSize;
                }
            }

            // Check violations for individual conduit type
            if (horizontalWidth > maxWidth) {
                violations.add(type + " exceeds trench width allotment (" + horizontalWidth + " > " + maxWidth + ").");
            }
            if (verticalHeight > maxDepth) {
                violations.add(type + " exceeds trench depth allotment (" + verticalHeight + " > " + maxDepth + ").");
            }

            // Add dimensions to overall trench
            totalWidth += horizontalWidth;
            if (type.contains("Electric")) {
                electricDepth = Math.max(electricDepth, verticalHeight); // Electric conduits at bottom
            } else {
                nonElectricDepth = Math.max(nonElectricDepth, verticalHeight); // Non-electric conduits stacked above
            }
        }

        // Calculate total trench depth
        totalDepth = 4 + electricDepth + 12 + nonElectricDepth + 24 + 6;

        // Round up trench width to the nearest multiple of 6 inches
        double finalWidth = Math.ceil(totalWidth / 6.0) * 6;

        
        results.put("violations", violations);
        results.put("finalTrenchWidth", (int) finalWidth);
        results.put("finalTrenchDepth", (int) totalDepth);
        return results;
    }


    /**
     * 
     * @param size
     * @return
     */
    // Helper to adjust conduit sizes
    private double adjustSize(double size) {
        return size == 2.0 ? 2.5 : size + 1.0;
    }

    /**
     * 
     * @param sizes
     * @return
     */
    // Helper to parse sizes from the input
    private List<Double> parseSizes(Object sizes) {
        if (sizes instanceof List) {
            return (List<Double>) sizes;
        } else if (sizes instanceof String) {
            String[] sizeArray = ((String) sizes).split(",");
            List<Double> sizeList = new ArrayList<>();
            for (String s : sizeArray) {
                sizeList.add(Double.parseDouble(s.equals("") ? "0" :  s.trim()));
            }
            return sizeList;
        } else {
            throw new IllegalArgumentException("Invalid sizes format: " + sizes);
        }
    }
}