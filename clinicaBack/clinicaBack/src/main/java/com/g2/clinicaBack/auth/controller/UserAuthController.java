package com.g2.clinicaBack.auth.controller;

import com.g2.clinicaBack.auth.dto.AutenticacionRequest;
import com.g2.clinicaBack.auth.dto.AutenticacionResponse;
import com.g2.clinicaBack.auth.dto.UserDTO;
import com.g2.clinicaBack.auth.dto.UserDoctorDto;
import com.g2.clinicaBack.auth.model.User;
import com.g2.clinicaBack.auth.service.JwtUtils;
import com.g2.clinicaBack.auth.service.UserDetailsCustomService;
import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.dto.DoctorUserDto;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.models.Doctor;
import com.g2.clinicaBack.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;



import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*")
public class UserAuthController {


    private UserDetailsCustomService userDetailsService;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtTokenUtil;
    private EmailService emailService;



    @Autowired
    public UserAuthController(UserDetailsCustomService userDetailsService, AuthenticationManager authenticationManager, JwtUtils jwtTokenUtil, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.emailService = emailService;

    }

    @PostMapping("/register")
    public ResponseEntity<AutenticacionResponse> register(@Valid @RequestBody UserDTO user) throws ExceptionService {
        user.setRole(User.ROLE_USER);
        this.userDetailsService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PostMapping("/login")
    public ResponseEntity<AutenticacionResponse> login(@RequestBody AutenticacionRequest authRequest) throws ExceptionService {

        UserDetails userDetails;

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            userDetails = (UserDetails) auth.getPrincipal();
        } catch (BadCredentialsException e) {
            throw new ExceptionService("usuario o clave incorrecta");
        }

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        String email = userDetails.getUsername();
        String firstName = ((User) userDetails).getFirstName();
        String lastName = ((User) userDetails).getLastName();
        String role = ((User) userDetails).getRole();
        Long id = ((User) userDetails).getId();
        List<Doctor> doctors = ((User) userDetails).getFavoriteDoctors();
        return ResponseEntity.ok(new AutenticacionResponse(id,jwt, email, firstName,lastName, role, doctors));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String jwt = extraerJwtDesdeSolicitud(request);
        return ResponseEntity.ok("Cierre de sesión exitoso");
    }

    private String extraerJwtDesdeSolicitud(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = userDetailsService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO user = userDetailsService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    @GetMapping("/sendEmail/{userId}")
    public ResponseEntity<Boolean> sendEmail( @PathVariable Long userId) {
        UserDTO user = userDetailsService.getUserById(userId);
        if (user != null) {
            emailService.sendWelcomeEmailTo(user);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/chageRole/{userId}")
    public ResponseEntity<Boolean> chageRole( @PathVariable Long userId) {
        UserDTO user = userDetailsService.getUserByIdByRole(userId);
        if (user != null) {
            userDetailsService.changRole(user);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userDetailsService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/doctorFavs")
    public ResponseEntity<Boolean> manageFavorites(@RequestBody UserDoctorDto userDoctorDto) {
        userDetailsService.manageFavorites(userDoctorDto);
        return ResponseEntity.ok(userDoctorDto.isAddToFavorites());
    }

    /*@GetMapping("/doctorFavs/{userId}")
    public ResponseEntity<List<Long>> favsDoctorsId(@PathVariable Long userId){
       List<Long> favsDoctors = UserDetailsCustomService.findDoctorIdsByUserId(userId);
        return  ResponseEntity.ok(favsDoctors);
    }*/

}
