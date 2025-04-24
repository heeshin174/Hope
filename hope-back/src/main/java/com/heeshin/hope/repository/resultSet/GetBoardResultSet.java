package com.heeshin.hope.repository.resultSet;

public interface GetBoardResultSet {
    Long getBoardNumber();
    String getTitle();
    String getContent();
    String getWriteDatetime();
    String getWriterEmail();
    String getWriterNickname();
    String getWriterProfileImage();
}
