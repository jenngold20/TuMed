package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.auth.dto.UserDTO;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.service.EmailService;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServicioImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServicioImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendWelcomeEmailTo(UserDTO user) throws ExceptionService {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mensaje = new MimeMessageHelper(mimeMessage, true);

            mensaje.setTo(user.getEmail());
            mensaje.setFrom("group.tumed@gmail.com");
            mensaje.setSubject("Bienvenido a tuMed");

            mensaje.setText(email(user), true);

            mailSender.send(mimeMessage);
        } catch (MailException | MessagingException e) {
            throw new ExceptionService("No se pudo enviar el correo electrónico");
        }
    }

    public String email(UserDTO user){
        String bodyEmail= "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>cuerpo email</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            margin: 0% 20% 0% 20%;\n" +
                "            padding: 0;\n" +
                "\n" +
                "            background-image: url(https://tumedimgs3.s3.amazonaws.com/cbf128ec-4ed3-4022-bc90-b424dbf4c3f1.jpg);\n" +
                "            background-blend-mode: soft-light;\n" +
                "            background-position: center;\n" +
                "            background-size: 100%;\n" +
                "            background-repeat: no-repeat;\n" +
                "            background-color: rgba(251, 249, 249, 0.893);\n" +
                "\n" +
                "        }\n" +
                "\n" +
                "        #logo {\n" +
                "            display: flex;\n" +
                "            justify-content: center;\n" +
                "            padding: 2%;\n" +
                "            margin: 0% 5% 0% 5%;\n" +
                "\n" +
                "        }\n" +
                "\n" +
                "        .cuerpo {\n" +
                "            display: flex;\n" +
                "            justify-content: center;\n" +
                "            padding: 2%;\n" +
                "            margin: 0% 5% 0% 5%;\n" +
                "            text-align: justify;\n" +
                "            font-family: \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif;\n" +
                "            font-weight: lighter;\n" +
                "            font-size: medium;\n" +
                "        }\n" +
                "\n" +
                "        .cuerpo2 {\n" +
                "            display: flex;\n" +
                "            justify-content: center;\n" +
                "            padding: 2%;\n" +
                "            margin: 0% 5% 0% 5%;\n" +
                "            text-align: justify;\n" +
                "            font-family: \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif;\n" +
                "            font-weight: lighter;\n" +
                "            font-size: medium;\n" +
                "        }\n" +
                "\n" +
                "        .h3 {\n" +
                "            display: flex;\n" +
                "            padding: 2%;\n" +
                "            margin: 0% 5% 0% 5%;\n" +
                "            font-family: \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif;\n" +
                "            font-weight: bolder;\n" +
                "            font-size: larger;\n" +
                "        }\n" +
                "\n" +
                "        a {\n" +
                "            display: flex;\n" +
                "            padding: 2%;\n" +
                "            margin: 0% 5% 0% 5%;\n" +
                "        }\n" +
                "\n" +
                "        @media (max-width:490px) {\n" +
                "            .logo-img {\n" +
                "                display: flex;\n" +
                "            justify-content: center;\n" +
                "                width: 450px;\n" +
                "                height: 180px;\n" +
                "                margin: 0%;\n" +
                "                padding: 5%;\n" +
                "            }\n" +
                "            body{\n" +
                "                margin:0% 0% 0% 2%;\n" +
                "                padding: 0;\n" +
                "            }\n" +
                "        }\n" +
                "\n" +
                "    </style>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "    <div id=\"logo\">\n" +
                "        <img src=\"https://tumedimgs3.s3.amazonaws.com/fa953c24-fe7a-4e0a-b672-13f15a1f0460.jpg\" alt=\"Logo TuMed\"\n" +
                "            width=\"650 px\" height=\"200 px\" class=\"logo-img\">\n" +
                "    </div>\n" +
                "    <h3 class=\"h3\">\n" +
                "        ¡Gracias por registrarte en TuMed "+"  "+user.getFirstName()+"  "+user.getLastName() +" ! Empezarás una nueva experiencia con nosotros.\n" +
                "        Esperamos confíes en nuestros servicios y que cumplamos tus expectativas.\n" +
                "\n" +
                "    </h3>\n" +
                "    <p class=\"cuerpo\">\n" +
                "        Nuestra aplicación está dedicada a la salud de los pacientes, que acuden a nosotros en\n" +
                "        búsqueda de alivio y acompañamiento.\n" +
                "        Nuestro principal objetivo es guiarlos para encontrar al profesional que se ajuste a sus necesidades.\n" +
                "    </p>\n" +
                "    <p class=\"cuerpo2\">\n" +
                "        Puedes ingresar a tu cuenta haciendo click en el siguiente enlace:\n" +
                "    </p>\n" +
                "    <p class=\"cuerpo2\">\n" +
                "        Tu nombre de usuario es: "+ user.getEmail() + "\n" +
                "    </p>\n" +
                "    <a href=\"http://localhost:3000/auth/signin\">Presione aquí.</a>\n" +
                "\n" +
                "\n" +
                "</body>\n" +
                "\n" +
                "</html>";
        return bodyEmail;

    }

}