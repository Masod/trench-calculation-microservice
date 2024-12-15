package com.tarrar.trench;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */


@SpringBootApplication
public class TrenchCalculationMicroserviceApplication {

	
	/**
	 * 
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(TrenchCalculationMicroserviceApplication.class, args);
	       openBrowser("http://localhost:8080/");
	    }

	    private static void openBrowser(String url) {
	        if (Desktop.isDesktopSupported()) {
	            try {
	                Desktop.getDesktop().browse(new URI(url));
	            } catch (IOException | URISyntaxException e) {
	                System.err.println("Failed to open browser: " + e.getMessage());
	            }
	        } else {
	            System.err.println("Desktop is not supported. Cannot open browser automatically.");
	        }
	    }
}
