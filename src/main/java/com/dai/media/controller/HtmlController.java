package com.dai.media.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("html")
@Controller
public class HtmlController {

    @RequestMapping("/{value}")
    public String toHref(@PathVariable String value){
        return value;
    }

}
