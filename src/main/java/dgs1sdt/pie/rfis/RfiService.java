package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RfiService {
  private RfiRepository rfiRepository;
  private GetsClient getsClient;
  private MetricController metricController;

  @Autowired
  public void setMetricController(MetricController metricController) {
    this.metricController = metricController;
  }

  @Autowired
  public void setGetsClient(GetsClient getsClient) {
    this.getsClient = getsClient;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Value("${GETS_URI_OPEN_PENDING}")
  String getsUriOpenPending;

  @Value("${GETS_URI_CLOSED}")
  String getsUriClosed;

  @Autowired
  public RfiService(RfiRepository rfiRepository,
                    GetsClient getsClient,
                    MetricController metricController) {
    this.rfiRepository = rfiRepository;
    this.getsClient = getsClient;
    this.metricController = metricController;
  }

  @Scheduled(fixedDelay = 60000)
  public void fetchRfisFromGets() {
    System.out.println("Fetching from GETS!");
    String[] uris = {getsUriOpenPending, getsUriClosed};
    fetchRfisFromUris(uris);
  }

  public void fetchRfisFromUris(String[] uris) {
    try {
      this.updateRepoFromGets(uris);
    } catch (Exception e) {
      System.err.println("Error fetching from GETS: " + e.getMessage());
    }
    this.updatePrioritiesInRepo(rfiRepository);
  }

  public List<Rfi> fetchRfisFromRepo() {
    return pendingOpenAndLastThreeClosedRfis();
  }

  private List<Rfi> pendingOpenAndLastThreeClosedRfis() {
    List<Rfi> allRfis = this.rfiRepository.findAll();
    List<Rfi> lastThreeClosed = this.filterLastThreeClosed(allRfis);
    List<Rfi> pendingOpenAndLastThreeClosed;

    pendingOpenAndLastThreeClosed = allRfis.stream()
      .filter(rfi -> isPendingOpenOrRecentlyClosed(lastThreeClosed, rfi))
      .collect(Collectors.toList());
    pendingOpenAndLastThreeClosed.sort(Comparator.comparing(Rfi::getRfiId));
    return pendingOpenAndLastThreeClosed;
  }

  private void updatePrioritiesInRepo(RfiRepository rfiRepository) {
    List<Rfi> allRfis = rfiRepository.findAll();
    rfiRepository.saveAll(
      Objects.requireNonNull(
        RfiPrioritizer.prioritize(allRfis)
      )
    );
  }

  private boolean isPendingOpenOrRecentlyClosed(List<Rfi> lastThreeClosed, Rfi rfi) {
    return !rfi.getStatus().equals("CLOSED") || lastThreeClosed.contains(rfi);
  }

  private void updateRepoFromGets(String[] uris) throws Exception {
    for (String uri : uris) {
      updateAndSaveRfis(
        marshallDocumentToRfis(
          getsClient.rfiResponseDocument(uri)
        )
      );
    }
  }

  void updateAndSaveRfis(List<Rfi> newRfis) {
    Date currDate = new Date();
    for (Rfi newRfi : newRfis) {
      createOrUpdateRfi(newRfi, currDate);
      rfiRepository.save(newRfi);
    }
  }

  private void createOrUpdateRfi(Rfi newRfi, Date currDate) {
    Rfi oldRfi = rfiRepository.findByRfiId(newRfi.getRfiId());
    if (existsInRepo(oldRfi)) {
      linkNewRfiToOldRfi(newRfi, oldRfi);
      if (hasChanged(newRfi, oldRfi)) {
        postUpdateMetrics(newRfi, currDate, oldRfi);
      }
    }
  }

  private void postUpdateMetrics(Rfi newRfi, Date currDate, Rfi oldRfi) {
    for (String field : oldRfi.compare(newRfi)) {
      metricController.addRfiUpdate(new RfiUpdate(currDate, newRfi, oldRfi, field));
    }
  }

  private void linkNewRfiToOldRfi(Rfi newRfi, Rfi oldRfi) {
    newRfi.setPriority(oldRfi.getPriority());
    newRfi.setId(oldRfi.getId());
  }

  private boolean hasChanged(Rfi newRfi, Rfi oldRfi) {
    return !newRfi.equals(oldRfi);
  }

  private boolean existsInRepo(Rfi rfi) {
    return rfi != null;
  }

  private List<Rfi> filterLastThreeClosed(List<Rfi> rfiList) {
    List<Rfi> filteredList = rfiList.stream()
      .filter(rfi -> rfi.getStatus().equals("CLOSED"))
      .sorted(new SortByRecentFirst())
      .collect(Collectors.toList());

    int maxRfis = Math.min(filteredList.size(), 3);
    return filteredList.subList(0, maxRfis);
  }

  public List<Rfi> marshallDocumentToRfis(Document document) throws Exception {
    NodeList nodeList = document.getElementsByTagName("getsrfi:RequestForInformation");

    return rfisFromElements(nodeList);
  }

  private static List<Rfi> rfisFromElements(NodeList htmlRfis) throws Exception {
    List<Rfi> rfiList = new ArrayList<>();

    for (int i = 0; i < htmlRfis.getLength(); i++) {
      Node node = htmlRfis.item(i);
      rfiList.add(RfiDeserializer.deserialize(node));
    }

    return rfiList;
  }
}
