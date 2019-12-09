package dgs1sdt.pie.rfis;

import java.util.List;
import java.util.stream.Collectors;

public class RfiPrioritizer {
  public static List<Rfi> prioritize(List<Rfi> rfis) {
    int nextPriority = lowestExistingPriority(rfis);
    for (Rfi rfi : unprioritizedOpenRfis(rfis)) {
      rfi.setPriority(++nextPriority);
    }
    return rfis;
  }

  private static int lowestExistingPriority(List<Rfi> rfis) {
    return (int) rfis.stream()
      .filter(RfiPrioritizer::isOpenAndPrioritized)
      .count();
  }

  private static List<Rfi> unprioritizedOpenRfis(List<Rfi> rfis) {
    return rfis.stream()
      .filter(RfiPrioritizer::isOpenAndUnprioritized)
      .collect(Collectors.toList());
  }

  private static boolean isOpenAndPrioritized(Rfi rfi) {
    return rfi.getStatus().equals("OPEN") && rfi.getPriority() > 0;
  }

  private static boolean isOpenAndUnprioritized(Rfi rfi) {
    return rfi.getStatus().equals("OPEN") && rfi.getPriority() == -1;
  }
}
