package com.vivek.QuizApplication.controller;
import com.vivek.QuizApplication.request.LoginOtpRequest;
import com.vivek.QuizApplication.request.LoginRequest;
import com.vivek.QuizApplication.request.SignupRequest;
import com.vivek.QuizApplication.response.AuthResponse;
import com.vivek.QuizApplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<String> sentOtpHandler(@RequestBody LoginOtpRequest req){

        userService.sentLoginOtp(req.getEmail());
        return ResponseEntity.ok("otp sent successfully...");
    }

    @PostMapping("/reg")
    public ResponseEntity<AuthResponse> registration(@RequestBody SignupRequest req) throws Exception {

        String jwt = userService.registration(req);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMsg("Registration successfully...");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) throws Exception {
        String jwt = userService.login(req);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMsg("login successfully...");
        return ResponseEntity.ok(response);
    }

//    @DeleteMapping("/delete/{id}")
//    public String deleteUser(@PathVariable Integer id){
//
//        return userService.deleteUser(id);
//    }

//    @PutMapping("/update")
//    public String updateUserDetails(@RequestParam Integer id , @RequestBody QuizUser quizUser){
//        return userService.updateUserDetails(id,quizUser);
//    }
//
//    @GetMapping("/user-greet")
//    public String userGreet(){
//        return "mai user hoo";
//    }
//
//    @Autowired
//    JwtUtil jwtUtil;
//
//    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) throws Exception {
//        String jwt = userService.login(req);
//        AuthResponse response = new AuthResponse();
//        response.setJwt(jwt);
//        response.setMsg("login successfully...");
//        return ResponseEntity.ok(response);
//    }

//    @PostMapping("/generate-token")
//    public ResponseEntity<String> generateToken(@RequestParam String username, @RequestParam String password) {
//        if (userService.authenticateUser(username, password)) {
//            // Return the token along with HTTP 200 OK status
//            return ResponseEntity.ok(jwtUtil.generateToken(username));
//        } else {
//            // Return error message with HTTP 401 Unauthorized status
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
//        }
//    }

}
