package dgs1sdt.magpie.scois;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class TgtAssociation {
  private String name;
  private String mgrs;
  private Set<String> emails;

  public TgtAssociation(String name, String mgrs) {
    this.name = name;
    this.mgrs = mgrs;
    this.emails = new HashSet<>();
  }

  public boolean equals(Object o){
    if(o instanceof TgtAssociation){
      TgtAssociation toCompare = (TgtAssociation) o;
      return this.name.equals(toCompare.getName());
    }
    return false;
  }
}
