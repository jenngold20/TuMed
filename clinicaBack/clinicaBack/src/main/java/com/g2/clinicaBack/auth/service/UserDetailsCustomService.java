package com.g2.clinicaBack.auth.service;
import com.g2.clinicaBack.auth.dto.UserDTO;
import com.g2.clinicaBack.auth.dto.UserDoctorDto;
import com.g2.clinicaBack.auth.maper.UserMaper;
import com.g2.clinicaBack.auth.model.User;
import com.g2.clinicaBack.auth.repository.UserRepository;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.models.Doctor;
import com.g2.clinicaBack.repository.DoctorRepository;
import com.g2.clinicaBack.service.EmailService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsCustomService implements UserDetailsService {


    private final UserRepository userRepository;
    private final EmailService emailService;
    private final DoctorRepository doctorRepository;

    public UserDetailsCustomService(UserRepository userRepository, EmailService emailService, DoctorRepository doctorRepository) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.doctorRepository = doctorRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String userName) {
        User userEntity = userRepository.findByUsername(userName);
        if (userEntity == null) {
            throw new ExceptionService("Usuario o contraseña incorrecta");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userEntity.getRole()));

         return userEntity;
    }


    public boolean checkIfUserExist(String username) {
        return userRepository.findByUsername(username) != null;
    }

    public boolean save(UserDTO userDTO) throws ExceptionService{
        if(checkIfUserExist(userDTO.getEmail())){
            throw new ExceptionService("El correo con el que quiere registrarse ya esta en uso");
        }
        User userEntity = new User();
        userEntity.setUsername(userDTO.getEmail());
        userEntity.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        userEntity.setLastName(userDTO.getLastName());
        userEntity.setFirstName(userDTO.getFirstName());

        userEntity = this.userRepository.save(userEntity);

        if (userEntity != null) {
            emailService.sendWelcomeEmailTo(userDTO);
        }
        return userEntity != null;
    }

    public List<UserDTO> getAllUsers() {
        List<UserDTO> userDTOS =  UserMaper.toUserDtoList(userRepository.findAll());
        return userDTOS;
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        UserDTO userDTO = UserMaper.toUserDto(user);
        return userDTO;
    }



    public void changRole(UserDTO user) {

        if (User.ROLE_USER.equals(user.getRole())){
            user.setRole(User.ROLE_ADMIN);
        }
        else{
            user.setRole(User.ROLE_USER);
        }

        userRepository.save(UserMaper.toUser(user));
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public UserDTO getUserByIdByRole(Long id) {
        UserDTO userDTO = UserMaper.toUserDto(userRepository.findById(id).orElse(null));
        return userDTO;
    }


    public void manageFavorites(UserDoctorDto userDoctorDto) {
        User user = userRepository.findById(userDoctorDto.getUserId())
                .orElseThrow(() -> new ExceptionService("User no existe"));
        Doctor doctor = doctorRepository.findById(userDoctorDto.getDoctorId())
                .orElseThrow(() -> new ExceptionService("Doctor no existe"));

        if (userDoctorDto.isAddToFavorites()) {
            addToFavorites(user, doctor);
        } else {
            removeFromFavorites(user, doctor);
        }
    }

    public void addToFavorites(User user, Doctor doctor) {
        user.addToFavorites(doctor);
        userRepository.save(user);
    }

    public void removeFromFavorites(User user, Doctor doctor) {
        user.removeFromFavorites(doctor);
        userRepository.save(user); // Guarda los cambios en la base de datos
    }



}