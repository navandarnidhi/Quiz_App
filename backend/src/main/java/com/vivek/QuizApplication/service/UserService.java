package com.vivek.QuizApplication.service;

import com.vivek.QuizApplication.entity.QuizUser;
import com.vivek.QuizApplication.entity.VerificationCode;
import com.vivek.QuizApplication.repo.UserRepo;
import com.vivek.QuizApplication.repo.VerificationCodeRepo;
import com.vivek.QuizApplication.request.LoginRequest;
import com.vivek.QuizApplication.request.SignupRequest;
import com.vivek.QuizApplication.util.JwtUtil;
import com.vivek.QuizApplication.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private VerificationCodeRepo verificationCodeRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    // Use BCryptPasswordEncoder to hash the password
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public void sentLoginOtp(String email){
       VerificationCode isExist =  verificationCodeRepo.findByEmail(email);
       if(isExist != null){
           verificationCodeRepo.delete(isExist);
       }

       String otp = OtpUtil.generateOtp();

       VerificationCode verificationCode = new VerificationCode();
       verificationCode.setEmail(email);
       verificationCode.setOtp(otp);
       verificationCodeRepo.save(verificationCode);

       String subject = "Master Quiz login/signup Otp";
       String text = "your otp is - ";
       emailService.sendVerificationOtpEmail(email,otp,subject,text);

    }

    public String registration(SignupRequest request) throws Exception {

        String email = request.getEmail();
        String otp = request.getOtp();
        String name = request.getFullName();

        String password = passwordEncoder.encode(otp);

        QuizUser user = userRepo.findByEmail(email);

        VerificationCode verificationCode = verificationCodeRepo.findByEmail(email);

        if(verificationCode==null || !verificationCode.getOtp().equals(otp)){
            throw new Exception("wrong credentials...");
        }

        if(user==null){
            QuizUser createUser = new QuizUser();
            createUser.setEmail(email);
            createUser.setUserName(name);
            createUser.setPassword(password);

            userRepo.save(createUser);

        }

        return jwtUtil.generateToken(email);

    }


//    public String deleteUser(Integer id) {
//        userRepo.deleteById(id);
//        return "user deleted....";
//    }

//    public String updateUserDetails(Integer id , QuizUser quizUser) {
//        Optional<QuizUser> userById =  userRepo.findById(id);
//        if(userById.isPresent()){
//
//            QuizUser user = userById.get();
//            user.setId(quizUser.getId());
//            user.setUserName(quizUser.getUserName());
//            user.setEmail(quizUser.getEmail());
//
//            String encryptedPassword = passwordEncoder.encode(quizUser.getPassword());
//            user.setPassword(encryptedPassword);
//
//            userRepo.save(user);
//            return "user details updated....";
//        }
//        else {
//           return "user not present in DB";
//        }
//
//    }


    public String login(LoginRequest request) throws Exception {
        String email = request.getEmail();
        String otp = request.getOtp();

        VerificationCode auth = verificationCodeRepo.findByEmail(email);
        if(auth==null || !auth.getOtp().equals(otp)){
            throw new Exception("invalid credentials");
        }
        QuizUser user = userRepo.findByEmail(email);
        user.setPassword(passwordEncoder.encode(otp));
        userRepo.save(user);
        return jwtUtil.generateToken(email);
    }

//    public boolean authenticateUser(String username, String password) {
//        // Find the user by their username
//        QuizUser user = userRepo.findByUserName(username);
//
//        if (user == null) {
//            // User not found
//            return false;
//        }
////        if (password.equals(user.getPassword())){
////            return true;
////        }
////
////        // Compare the provided password with the stored password
////        return false;
//
//
//        // Compare the provided password with the stored hashed password
//        return passwordEncoder.matches(password, user.getPassword());
//
//    }
}
