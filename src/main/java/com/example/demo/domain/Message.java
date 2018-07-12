package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class Message {


    LocalDateTime received;
    boolean messageReceived;
    boolean translated;
    boolean caseCreated;
    boolean caseSaved;
    String message;
    Person associatedPerson;
    public Message(LocalDateTime received, boolean messageReceived, boolean translated, boolean caseCreated, boolean caseSaved, String message,Person person) {
        this.received = received;
        this.messageReceived = messageReceived;
        this.translated = translated;
        this.caseCreated = caseCreated;
        this.caseSaved = caseSaved;
        this.message = message;
        this.associatedPerson = person;

    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime getReceived() {
        return received;

    }

    public void setReceived(LocalDateTime received) {
        this.received = received;
    }

    public Person getAssociatedPerson() {
        return associatedPerson;
    }

    public void setPerson(Person associatedPerson) {
        this.associatedPerson = associatedPerson;
    }

    public boolean isMessageReceived() {
        return messageReceived;
    }

    public void setMessageReceived(boolean messageReceived) {
        this.messageReceived = messageReceived;
    }

    public boolean isTranslated() {
        return translated;
    }

    public void setTranslated(boolean translated) {
        this.translated = translated;
    }

    public boolean isCaseCreated() {
        return caseCreated;
    }

    public void setCaseCreated(boolean caseCreated) {
        this.caseCreated = caseCreated;
    }

    public boolean isCaseSaved() {
        return caseSaved;
    }

    public void setCaseSaved(boolean caseSaved) {
        this.caseSaved = caseSaved;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



}
