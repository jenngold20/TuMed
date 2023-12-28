package com.g2.clinicaBack.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class CloudDto {
    private MultipartFile file;
}
