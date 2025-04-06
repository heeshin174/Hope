package com.heeshin.hope.common;

public interface ResponseCode {
    // HTTP status 200
    String SUCCESS = "SU";

    // HTTP status 400
    String VALIDATION_ERROR = "VE";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NOT_EXIST_USER = "NU";
    String NOT_EXIST_BOARD = "NB";

    // HTTP status 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";

    // HTTP status 403
    String NO_PERMISSION = "NP";

    // HTTP status 500
    String DATABASE_ERROR = "DBE";
}
