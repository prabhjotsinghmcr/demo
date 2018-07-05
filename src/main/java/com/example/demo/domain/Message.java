package com.example.demo.domain;

public class Message {

    String recieveTime;
    String person;
    boolean messageReceived;
    boolean Translated;
    boolean caseCreated;

    public String getRecieveTime() {
        return recieveTime;
    }

    public void setRecieveTime(String recieveTime) {
        this.recieveTime = recieveTime;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public boolean isMessageReceived() {
        return messageReceived;
    }

    public void setMessageReceived(boolean messageReceived) {
        this.messageReceived = messageReceived;
    }

    public boolean isTranslated() {
        return Translated;
    }

    public void setTranslated(boolean translated) {
        Translated = translated;
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

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    boolean caseSaved;
    String error;

}
