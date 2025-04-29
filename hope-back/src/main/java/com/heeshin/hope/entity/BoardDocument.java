package com.heeshin.hope.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * Elasticsearch document representing a board post.
 * This class is used for indexing and searching board data in Elasticsearch.
 * Mirrors the fields of BoardEntity but is annotated for Elasticsearch.
 */
@Document(indexName = "boards")
public class BoardDocument {
    /**
     * Unique identifier for the board document (as a string).
     */
    @Id
    private String id;
    /**
     * Title of the board post.
     */
    private String title;
    /**
     * Content/body of the board post.
     */
    private String content;
    /**
     * Date and time when the board post was written.
     */
    private String writeDatetime;
    /**
     * Number of favorites for the board post.
     */
    private int favoriteCount;
    /**
     * Number of comments for the board post.
     */
    private int commentCount;
    /**
     * Number of views for the board post.
     */
    private int viewCount;
    /**
     * Email of the user who wrote the board post.
     */
    private String writerEmail;

    /**
     * Default constructor required by Elasticsearch.
     */
    public BoardDocument() {}

    /**
     * Constructor to create a BoardDocument from board entity fields.
     */
    public BoardDocument(Long id, String title, String content, String writeDatetime, int favoriteCount, int commentCount, int viewCount, String writerEmail) {
        this.id = id == null ? null : id.toString();
        this.title = title;
        this.content = content;
        this.writeDatetime = writeDatetime;
        this.favoriteCount = favoriteCount;
        this.commentCount = commentCount;
        this.viewCount = viewCount;
        this.writerEmail = writerEmail;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getWriteDatetime() { return writeDatetime; }
    public void setWriteDatetime(String writeDatetime) { this.writeDatetime = writeDatetime; }
    public int getFavoriteCount() { return favoriteCount; }
    public void setFavoriteCount(int favoriteCount) { this.favoriteCount = favoriteCount; }
    public int getCommentCount() { return commentCount; }
    public void setCommentCount(int commentCount) { this.commentCount = commentCount; }
    public int getViewCount() { return viewCount; }
    public void setViewCount(int viewCount) { this.viewCount = viewCount; }
    public String getWriterEmail() { return writerEmail; }
    public void setWriterEmail(String writerEmail) { this.writerEmail = writerEmail; }
}
