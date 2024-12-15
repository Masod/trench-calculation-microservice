package com.tarrar.trench.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */

//@Controller
public class CustomErrorController implements ErrorController {

	/**
	 * 
	 * @return
	 */
    @RequestMapping("/error")
    public String handleError() {
        return "error"; // Maps to error.html
    }
}
