package dgs1sdt.project.pie;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Utils {
  public static int DateToUnixTime(String datestr) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'" );
    sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date date = sdf.parse(datestr);
    long epoch = date.getTime();
    return (int) (epoch/1000);
  }

}
