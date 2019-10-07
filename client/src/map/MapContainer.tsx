import React from 'react';
import { connect } from 'react-redux';
import { fetchHiperStare } from '../redux/actions';

interface Props {
  loadHiperStare: () => void;
  map: any;
  className?: string;
}

export class MapContainer extends React.Component<Props> {
  render() {
    return (
      <div>
        <button onClick={()=>this.handleClick()}>Hijack</button>
        <div>{this.props.map}</div>
      </div>
    )
  }

  private handleClick() {
    this.props.loadHiperStare();
  }
}

const mapStateToProps = (state: any) => ({
  map: state.map
});

const mapDispatchToProps = {
  loadHiperStare: fetchHiperStare
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
