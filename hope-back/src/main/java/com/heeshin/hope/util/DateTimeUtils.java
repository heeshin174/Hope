package com.heeshin.hope.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// final class: 상속 방지
// private constructor: 인스턴스화 방지 (유틸리티 클래스이므로)
// Lombok의 @UtilityClass 어노테이션을 사용하면 아래 구조를 자동으로 만들어줍니다.
public final class DateTimeUtils {

    // 날짜/시간 포맷 정의
    private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(DATETIME_FORMAT);

    // 외부에서 인스턴스 생성을 막기 위한 private 생성자
    private DateTimeUtils() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * 현재 날짜와 시간을 "yyyy-MM-dd HH:mm:ss" 형식의 문자열로 반환합니다.
     * @return 포맷팅된 현재 날짜/시간 문자열
     */
    public static String getCurrentDateTimeString() {
        LocalDateTime now = LocalDateTime.now(); // 현재 날짜/시간 가져오기 (java.time 사용)
        return now.format(DATE_TIME_FORMATTER);   // 정의된 포맷으로 변환
    }
}