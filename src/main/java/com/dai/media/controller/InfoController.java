package com.dai.media.controller;

import jdk.nashorn.internal.runtime.linker.Bootstrap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.*;

@RestController
@RequestMapping("info")
public class InfoController {

    @RequestMapping("/getInfos")
    public Object getInfos(@RequestParam(name = "path") String path,
                           @RequestParam(name = "isRoot", required = false) boolean isRoot,
                           HttpServletResponse response){
        if(StringUtils.isEmpty(path)){
            return null;
        }
        String filePath = isRoot ? path + ":" : path;
        File file = new File(filePath);
        if(file.isDirectory()){
            List<Map<String,Object>> results = new LinkedList<>();
            File[] childFiles = file.listFiles();
            for(File childFile : childFiles){
                Map<String,Object> result = new HashMap<>();
                result.put("name", childFile.getName());
                //判断是否是文件夹
                boolean isDirectory = childFile.isDirectory();
                if(isDirectory){
                    //获取有多少个文件
                    File[] fs = childFile.listFiles();
                    int count = 0;
                    if(fs != null){
                        count = childFile.listFiles().length ;
                    }
                    result.put("count", count);
                }else {
                    result.put("count", null);
                }
                result.put("file", childFile.getPath());
                results.add(result);
            }
            return results;
        }else{
            try {
                response.setContentType("video/mp4");
                FileInputStream fis = new FileInputStream(file);
                byte[] bytes = new byte[10];
                int byteread = 0;
                 // 一次读10个字节，如果文件内容不足10个字节，则读剩下的字节。
                // 将一次读取的字节数赋给byteread
                while ((byteread = fis.read(bytes)) != -1) {
                    response.getOutputStream().write(bytes);
                }
                response.getOutputStream().close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;

    }




}
