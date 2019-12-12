package dgs1sdt.pie.rfis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RfiService {
  @Autowired
  private RfiRepository rfiRepository;

  @Autowired
  private GetsClient getsClient;

  public RfiService(RfiRepository rfiRepository, GetsClient getsClient) {
    this.rfiRepository = rfiRepository;
    this.getsClient = getsClient;
  }

  public List<Rfi> fetchRfis(String[] uris) throws Exception {
    this.updateRepoFromGETS(uris);
    this.updatePrioritiesInRepo(rfiRepository);
    return pendingOpenAndLastThreeClosedRfis();
  }

  private List<Rfi> pendingOpenAndLastThreeClosedRfis() {
    List<Rfi> allRfis = this.rfiRepository.findAll();
    List<Rfi> lastThreeClosed = this.filterLastThreeClosed(allRfis);

    return allRfis.stream()
      .filter(rfi -> isPendingOpenOrRecentlyClosed(lastThreeClosed, rfi))
      .collect(Collectors.toList());
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

  private void updateRepoFromGETS(String[] uris) throws Exception {
    for (String uri : uris) {
      createOrUpdate(
        marshallDocumentToRfis(
          getsClient.rfiResponseDocument(uri)
        )
      );
    }
  }

  private void createOrUpdate(List<Rfi> rfis) {
    for (Rfi rfi : rfis) {
      linkToExisting(rfi);
      rfiRepository.save(rfi);
    }
  }

  private void linkToExisting(Rfi rfi) {
    Rfi savedRfi = rfiRepository.findByRfiId(rfi.getRfiId());
    if (exists(savedRfi)) {
      rfi.setPriority(savedRfi.getPriority());
      rfi.setId(savedRfi.getId());
    }
  }

  private boolean exists(Rfi rfi) {
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
