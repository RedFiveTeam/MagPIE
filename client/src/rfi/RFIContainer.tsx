import React from 'react';
import { connect } from 'react-redux';
import { fetchGETSRfi } from '../redux/actions';

interface Props {
  loadGETSRfi: () => void;
  rfi: any;
  className?: string;
}

class RFIContainer extends React.Component<Props> {
  render() {
    return (
      <div>
        <button onClick={()=>this.handleClick()}>Get Api</button>
        <div>{this.props.rfi}</div>
      </div>
    )
  }

  handleClick() {
    this.props.loadGETSRfi();
  }
}

const mapStateToProps = (state: any) => ({
  rfi : state.rfi
});

const mapDispatchToProps = {
  loadGETSRfi: fetchGETSRfi
};

export default connect(mapStateToProps, mapDispatchToProps)(RFIContainer);
