package com.g2.clinicaBack.service;

import com.g2.clinicaBack.dto.CloudDto;
import com.g2.clinicaBack.models.Cloud;

import java.io.IOException;

public interface CloudService {
    Cloud save(CloudDto cloud) throws IOException;
}
