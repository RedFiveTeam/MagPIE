import * as React from 'react';
import { connect } from 'react-redux';
import DisplayFact from '../fact/DisplayFact';
import classNames from 'classnames';
import { fetchActions } from '../redux/actions';

interface Props {
  fact: string;
  getFact: () => void;
  pending: boolean;
  className?: string;
}


class MainPageContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getFact();
  }

  render() {
    return (
      <div className={classNames('main-page-container', this.props.className)}>
        {
          this.props.pending ?
            <div>LOADING...back off!</div> :
            <DisplayFact
              fact={this.props.fact}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  fact: state.fact,
  pending: state.pending
});

const mapDispatchToProps = {
  getFact: fetchActions
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
