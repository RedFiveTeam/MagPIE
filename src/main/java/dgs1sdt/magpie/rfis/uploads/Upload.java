package dgs1sdt.magpie.rfis.uploads;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "data_upload")
@NoArgsConstructor
public class Upload {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private int rfiId;
  private String fileName;
  private String contentType;

  @Column(length = 16777216) // 16MB file size to match MySQL mediumblob size from the DB, next larger is 4GB
  private byte[] data;

  public Upload(int rfiId, String fileName, String contentType, byte[] data) {
    this.rfiId = rfiId;
    this.fileName = fileName;
    this.contentType = contentType;
    this.data = data;
  }
}
