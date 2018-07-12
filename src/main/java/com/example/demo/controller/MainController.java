package com.example.demo.controller;

import com.example.demo.domain.HelloMessage;
import com.example.demo.domain.Message;
import com.example.demo.domain.Person;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;


@Controller
public class MainController {

//    @RequestMapping(value = "/index")
//    public String index(){
//        return "index";
//    }
//
//    @MessageMapping("/test")
//    @SendTo("/topic/errorMessage")
//    public Message pulishMessage(Message message) throws Exception{
//        System.out.println("Publishing message: "+message.toString());
//        return message;
//    }
@MessageMapping("/hello")
@SendTo("/topic/greetings")
public Message greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    System.out.println("---controller req Data----");
//    return new Person("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    Person person = new Person(10,"title","FName","LName","JobTitle",true,true);
    Message errorMessage = new Message(LocalDateTime.now(),true,true,true,true,"New error Received",person);
    return errorMessage;
}
}
