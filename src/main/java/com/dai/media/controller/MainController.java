package com.dai.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("main")
public class MainController {

    @RequestMapping("/getHomeInfo")
    public Object getHomeInfo(){
        // 当前文件系统类
        FileSystemView fsv = FileSystemView.getFileSystemView();
        // 列出所有windows 磁盘
        File[] fs = File.listRoots();

        List<Map<String, Object>> results = new ArrayList<>();
        for(File f : fs){
            Map<String,Object> result = new HashMap<>();
            String fileName = f.toString();
            fileName = fileName.substring(0, fileName.length()-2);
            if("C".equalsIgnoreCase(fileName)||"D".equalsIgnoreCase(fileName)){
                continue;
            }
            //获取有多少个文件
            int count = f.listFiles().length;
            result.put("name", fileName + "盘");
            result.put("file", fileName);
            result.put("count", count);
            results.add(result);
        }
        return  results;

    }


}
