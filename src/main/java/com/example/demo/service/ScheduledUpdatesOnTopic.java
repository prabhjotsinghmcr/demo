package com.example.demo.service;

import com.example.demo.domain.KafkaServerStatus;
import com.example.demo.domain.Message;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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
            Message message = new Message(new Date().toString(),Integer.toString(i),true,true,true,true,"New error Received");
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
