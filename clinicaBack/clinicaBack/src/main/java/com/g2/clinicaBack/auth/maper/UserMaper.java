package com.g2.clinicaBack.auth.maper;

import com.g2.clinicaBack.auth.dto.UserDTO;
import com.g2.clinicaBack.auth.model.User;
import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.models.Doctor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMaper {

    public static UserDTO toUserDto(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole());
        userDTO.setEmailVerified(user.isEmailVerified());
        userDTO.setFavoriteDoctors(user.getFavoriteDoctors());
    return userDTO;
    }
    public static List<UserDTO> toUserDtoList(List<User> userList) {
        List<UserDTO> userDtoList = new ArrayList<>();

        for (User user : userList) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setEmail(user.getUsername());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setRole(user.getRole());
            userDTO.setEmailVerified(user.isEmailVerified());
            userDtoList.add(userDTO);
        }

        return userDtoList;
    }

    public static User toUser(UserDTO userDTO){
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setRole(userDTO.getRole());
        user.setEmailVerified(userDTO.isEmailVerified());
        return user;
    }

    public static UserDTO toUserDtoRole(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setPassword(user.getPassword());
        userDTO.setEmail(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole());
        userDTO.setEmailVerified(user.isEmailVerified());
        return userDTO;
    }



}
