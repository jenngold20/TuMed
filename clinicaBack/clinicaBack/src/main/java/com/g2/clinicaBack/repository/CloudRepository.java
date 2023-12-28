package com.g2.clinicaBack.repository;

import com.amazonaws.auth.AWSCredentials;
import com.g2.clinicaBack.dto.CloudDto;
import com.g2.clinicaBack.models.Cloud;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import java.io.IOException;
import java.util.UUID;

@Component
public class CloudRepository {

    private final String BUCKET = "tumedimgs3"; // Reemplaza con el nombre correcto de tu cubo
    private final String ACCESS_KEY = "AKIAY3PLHSUJDN7QRTHR"; // Reemplaza con tu clave de acceso
    private final String SECRET_KEY = "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"; // Reemplaza con tu clave secreta

    public Cloud save(CloudDto cloud) throws IOException {
        String extension = StringUtils.getFilenameExtension(cloud.getFile().getOriginalFilename());
        String key = String.format("%s.%s", UUID.randomUUID(), extension);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(cloud.getFile().getContentType());
        objectMetadata.setContentLength(cloud.getFile().getSize());

        AWSCredentials credentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);

        PutObjectRequest putObjectRequest =
                new PutObjectRequest(BUCKET, key, cloud.getFile().getInputStream(), objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);

        AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard()
                .withRegion("us-east-1")
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        amazonS3.putObject(putObjectRequest);

        return toCloudOutput(key, getObjectUrl(key));
    }

    private String getObjectUrl(String key) {
        return String.format("https://%s.s3.amazonaws.com/%s", BUCKET, key);
    }

    private Cloud toCloudOutput(String key, String url) {
        return Cloud.builder()
                .key(key)
                .url(url)
                .build();
    }
}
