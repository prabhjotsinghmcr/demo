package com.example.demo.service;

import com.example.demo.domain.KafkaServerStatus;
import com.example.demo.domain.Message;
import com.example.demo.domain.Person;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;


@Component
public class ScheduledUpdatesOnTopic {

    @Autowired
    private SimpMessagingTemplate template;

    @Scheduled(fixedDelay = 3000)
    public void publishUpdates(){
        Gson gson = new Gson();
        Collection<Object> messageList = new ArrayList<>();
        for (int i = 0; i<=9;i++){
            Person person = new Person(i,"title","FName","LName","JobTitle",true,true);
            Message message = new Message(LocalDateTime.now(),true,true,true,true,"New error Received",person);
            ((ArrayList<Object>) messageList).add(i,message);
        }
        Collection<Object> serverStatusList = new ArrayList<>();
        for (int i = 0;i<=4;i++){
            ((ArrayList<Object>) serverStatusList).add(i,new KafkaServerStatus(i,"Server:"+i,"Connected"));
        }
        ((ArrayList<Object>) serverStatusList).add(5,new KafkaServerStatus(5,"Server:5","Disconnected"));
        Map<String, Collection<Object>> mp = new HashMap<>();
        mp.put("messageList", messageList);
        mp.put("serverStatus", serverStatusList);
        String json = gson.toJson(mp);
        System.out.println("---Publishing Data----"+json);
        template.convertAndSend("/topic/greetings", json);



    }

}
