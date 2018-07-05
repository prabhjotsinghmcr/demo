package com.example.demo.controller;

import com.example.demo.domain.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController {

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @MessageMapping("/test")
    @SendTo("/topic/errorMessage")
    public Message pulishMessage(Message message) throws Exception{
        System.out.println("Publishing message: "+message.toString());
        return message;
    }
}
