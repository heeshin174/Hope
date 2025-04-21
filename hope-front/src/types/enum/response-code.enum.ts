enum ResponseCode {
    // HTTP status 200
    SUCCESS = "SU",
    
    // HTTP status 400
    VALIDATION_FAIL = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_TEL_NUMBER = "DT",
    NOT_EXIST_USER = "NU",
    NOT_EXIST_BOARD = "NB",

    // HTTP status 401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",

    // HTTP status 403
    NO_PERMISSION = "NP",

    // HTTP status 500
    DATABASE_ERROR = "DBE",
}

export default ResponseCode;