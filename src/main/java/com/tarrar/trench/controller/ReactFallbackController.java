package com.tarrar.trench.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * 
 * @author masood
 *
 * Dec 11, 2024
 * 
 */

//@Controller
public class ReactFallbackController {

	/**
	 * 
	 * @return
	 */
    @GetMapping(value = {"/", "/{path:^(?!api).*$}"})
    public String forwardToReact() {
        return "index.html";
    }
}