package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.dto.CloudDto;
import com.g2.clinicaBack.models.Cloud;
import com.g2.clinicaBack.repository.CloudRepository;
import com.g2.clinicaBack.service.CloudService;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CloudServiceImp implements CloudService {

    private final CloudRepository cloudRepository;

    public CloudServiceImp(CloudRepository cloudRepository) {
        this.cloudRepository = cloudRepository;
    }

    public Cloud save(CloudDto cloud) throws IOException {
        return cloudRepository.save(cloud);
    }

}
