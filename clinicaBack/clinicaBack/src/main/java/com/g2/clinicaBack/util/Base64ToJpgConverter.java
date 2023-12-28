package com.g2.clinicaBack.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

public class Base64ToJpgConverter {
    public static File convertBase64ToJpgFile(String base64String) throws IOException {
        if (base64String.startsWith("data:image/jpeg;base64,")) {
            base64String = base64String.substring("data:image/jpeg;base64,".length());
        }
        byte[] imageBytes = Base64.getDecoder().decode(base64String);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byteArrayOutputStream.write(imageBytes);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        File fakeFile = new File("fake.jpg");
        Files.write(fakeFile.toPath(), byteArray);

        return fakeFile;
    }
}
