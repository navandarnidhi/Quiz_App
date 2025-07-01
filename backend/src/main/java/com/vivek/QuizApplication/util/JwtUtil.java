package com.vivek.QuizApplication.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static io.jsonwebtoken.Jwts.builder;

@Component
public class JwtUtil {

    private static final String SECRET_KEY_STRING = "vivek#48954578099@@@@5656505487560erghughghtr";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    public String generateToken(String email){

        String token = builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .claim("email",email)
                .signWith(SECRET_KEY)
                .compact();  // return token as a String

        System.out.println("generated token : "+token);
        return token;

    }

    public boolean validateToken(String token){

        try {
            Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        }
        catch (ExpiredJwtException e){
            System.out.println("expired token: "+e.getMessage());
            return false;
        }
        catch (SignatureException e){
            System.out.println("Invalid JWT Signature: "+e.getMessage());
            return false;
        }
        catch (MalformedJwtException e){
            System.out.println("Invalid JWT token: "+e.getMessage());
            return false;
        }
        catch (UnsupportedJwtException e){
            System.out.println("JWT token is Unsupported: "+e.getMessage());
            return false;
        }
        catch (JwtException e){
            System.out.println("JWT Exception: "+e.getMessage());
            return false;
        }
    }

}
