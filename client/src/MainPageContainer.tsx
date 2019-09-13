import * as React from 'react';
import { updateTitle } from './actions';
import { connect } from 'react-redux';
import TitleInput from './TitleInput';

interface Props {
  title: string;
  updateTitle: (e: any) => void;
}


class MainPageContainer extends React.Component<Props> {
  render() {
    return <TitleInput title={this.props.title} updateTitle={this.props.updateTitle}/>
  }
}

const mapStateToProps = (state: any) => ({
  title: state.title
});

const mapDispatchToProps = {
  updateTitle: updateTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
