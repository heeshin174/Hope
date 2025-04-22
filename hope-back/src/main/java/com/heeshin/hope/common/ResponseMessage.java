package com.heeshin.hope.common;

public interface ResponseMessage {

    // HTTP status 200
    String SUCCESS = "Success";

    // HTTP status 400
    String VALIDATION_FAIL = "Validation Error";
    String DUPLICATE_EMAIL = "Duplicate Email";
    String DUPLICATE_NICKNAME = "Duplicate Nickname";
    String DUPLICATE_TEL_NUMBER = "Duplicate Tel Number";
    String NOT_EXIST_USER = "This user does not exist";
    String NOT_EXIST_BOARD = "This board does not exist";

    // HTTP status 401
    String SIGN_IN_FAIL = "Login information does not match";
    String AUTHORIZATION_FAIL = "Authorization Fail";

    // HTTP status 403
    String NO_PERMISSION = "Do not have permission to access this resource";

    // HTTP status 500
    String DATABASE_ERROR = "Database Error";
}
