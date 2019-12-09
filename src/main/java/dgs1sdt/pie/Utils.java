package dgs1sdt.pie;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Utils {
  public static Date parseDate(String datestr) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'" );
    sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    return sdf.parse(datestr);
  }

}
