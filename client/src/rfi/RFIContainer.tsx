import React from 'react';
import { connect } from 'react-redux';
import { fetchGETSRfi, updateApi } from '../redux/actions';

interface Props {
  loadGETSRfi: (e: any) => void;
  updateApi: (e: any) => void;
  rfi: any;
  api: string;
  className?: string;
}

class RFIContainer extends React.Component<Props> {
  render() {
    return (
      <div>
        <input
          className={"apiInput"}
          id={"apiText"}
          type={"text"}
          value={this.props.api}
          onChange={event=>this.handleChange(event.target.value)}
        />
        <button onClick={()=>this.handleClick()}>Get Api</button>
        <div>{this.props.rfi}</div>
      </div>
    )
  }

  handleChange(e: any) {
    console.log(this.props.api);
    this.props.updateApi(e);
  }

  handleClick() {
    this.props.loadGETSRfi(this.props.api);
  }
}

const mapStateToProps = (state: any) => ({
  rfi : state.rfi,
  api: state.api
});

const mapDispatchToProps = {
  loadGETSRfi: fetchGETSRfi,
  updateApi: updateApi
};

export default connect(mapStateToProps, mapDispatchToProps)(RFIContainer);
