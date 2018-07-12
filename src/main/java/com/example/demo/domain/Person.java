package com.example.demo.domain;

public class Person {

    int personId;
    String title;
    String firstName;
    String lastName;
    String jobTitle;
    boolean translated;
    boolean containsErrors;

    public Person() {
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public boolean isTranslated() {
        return translated;
    }

    public void setTranslated(boolean translated) {
        this.translated = translated;
    }

    public boolean isContainsErrors() {
        return containsErrors;
    }

    public void setContainsErrors(boolean containsErrors) {
        this.containsErrors = containsErrors;
    }

    public Person(int personId, String title, String firstName, String lastName, String jobTitle, boolean translated, boolean containsErrors) {
        this.personId = personId;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.translated = translated;
        this.containsErrors = containsErrors;
    }
}
