package com.deer.wms.device.manage.model;

import java.util.List;

public class InsertProject {
    private CheckProject checkProject;
    private List<CheckContent> checkContents;

    public CheckProject getCheckProject() {
        return checkProject;
    }

    public void setCheckProject(CheckProject checkProject) {
        this.checkProject = checkProject;
    }

    public List<CheckContent> getCheckContents() {
        return checkContents;
    }

    public void setCheckContents(List<CheckContent> checkContents) {
        this.checkContents = checkContents;
    }
}
