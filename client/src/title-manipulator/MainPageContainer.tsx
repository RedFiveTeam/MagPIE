import * as React from 'react';
import { updateTitle } from '../redux/actions';
import { connect } from 'react-redux';
import TitleInput from './TitleInput';
import classNames from 'classnames';

interface Props {
  title: string;
  updateTitle: (e: any) => void;
  className?: string;
}


class MainPageContainer extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('main-page-container', this.props.className)}>
      <TitleInput
        title={this.props.title}
        updateTitle={this.props.updateTitle}
      />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  title: state.title
});

const mapDispatchToProps = {
  updateTitle: updateTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
