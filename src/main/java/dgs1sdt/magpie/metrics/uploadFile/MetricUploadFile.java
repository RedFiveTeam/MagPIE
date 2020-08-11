package dgs1sdt.magpie.metrics.uploadFile;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Table(name = "metric_upload_file")
@Entity
@NoArgsConstructor
public class MetricUploadFile {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private int rfiId;
  private int uploadId;
  private String userName;
  private Timestamp timestamp;

  public MetricUploadFile(int rfiId, int uploadId, String userName) {
    this.rfiId = rfiId;
    this.uploadId = uploadId;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
