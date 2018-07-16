package com.example.demo.service;

import com.example.demo.domain.KafkaServerStatus;
import com.example.demo.domain.Message;
import com.example.demo.domain.Person;
import com.google.gson.Gson;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CountDownLatch;

@Component
public class ScheduledUpdatesOnTopic {

    @Autowired
    private SimpMessagingTemplate template;

    // declare zookeeper instance to access ZooKeeper ensemble
    private ZooKeeper zoo;

    final CountDownLatch connectedSignal = new CountDownLatch(1);

    @Scheduled(fixedDelay = 3000)
    public void publishUpdates(){
        int x = (int)Math.round(Math.random()*(8));
        Gson gson = new Gson();
        Collection<Object> messageList = new ArrayList<>();
        try {
            ZooKeeper z = connect("localhost:2181");
            List<Object> servers = Arrays.asList(z.getChildren("/brokers/ids", null).toArray());

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (KeeperException e) {
            e.printStackTrace();
        }

        for (int i = 0; i<=1;i++){
            Person person = new Person(x,"title","FName","LName","JobTitle",true,true);
            Message message = new Message(LocalDateTime.now(),true,true,true,true,LocalDateTime.now().toLocalTime().toString(),person);
            ((ArrayList<Object>) messageList).add(i,message);
        }
        Collection<Object> serverStatusList = new ArrayList<>();
        for (int i = 0;i<=3;i++){
            ((ArrayList<Object>) serverStatusList).add(i,new KafkaServerStatus(i,"Server:"+i,"Connected"));
        }
        ((ArrayList<Object>) serverStatusList).add(4,new KafkaServerStatus(5,"Server:5","Disconnected"));
        Map<String, Collection<Object>> mp = new HashMap<>();
        mp.put("messageList", messageList);
        mp.put("serverStatus", serverStatusList);
        String json = gson.toJson(mp);
        System.out.println("---Publishing Data----"+x);

        template.convertAndSend("/topic/greetings", json);



    }

    // Method to connect zookeeper ensemble.
    public ZooKeeper connect(String host) throws IOException, InterruptedException, KeeperException {

        zoo = new ZooKeeper(host,5000,new Watcher() {

            public void process(WatchedEvent we) {

                if (we.getState() == Event.KeeperState.SyncConnected) {
                    connectedSignal.countDown();
                }
            }
        });

        connectedSignal.await();
        return zoo;
    }

    // Method to disconnect from zookeeper server
    public void close() throws InterruptedException {
        zoo.close();
    }
}
