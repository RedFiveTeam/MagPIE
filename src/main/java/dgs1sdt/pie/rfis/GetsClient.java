package dgs1sdt.pie.rfis;

import java.util.List;

public interface GetsClient {
  List<Rfi> getRfis() throws Exception;

  List<Rfi> getRfis(String uri) throws Exception;
}
