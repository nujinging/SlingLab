package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;

@Accessors(chain = true)
@Setter
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "FOLLOW")
public class Follow implements Serializable {

    @Serial
    private static final long serialVersionUID = 1380661626105295079L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FOLLOW_IDX")
    private Long followIdx;

    @Column(name = "FOLLOWER")
    private Long follower;

    @Column(name = "FOLLOWEE")
    private Long followee;

}
