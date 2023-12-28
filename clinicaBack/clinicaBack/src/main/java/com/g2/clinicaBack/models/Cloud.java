package com.g2.clinicaBack.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Cloud {
    private String key;
    private String url;
}
