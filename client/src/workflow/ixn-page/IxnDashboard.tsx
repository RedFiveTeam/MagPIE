import * as React from 'react';
import styled from 'styled-components';
import { TargetModel } from '../tgt-page/models/TargetModel';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { ApplicationState } from '../../state';
import { StyledIxnHeader } from './IxnHeader';

interface Props {
  target: TargetModel
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  return(
    <div className={classNames(props.className)}>
      <StyledIxnHeader
        target={props.target}
      />
    </div>
  )
};

const mapStateToProps = ({ixns}: ApplicationState) => ({
  target: ixns.target,
});

const mapDispatchToProps = {
};

export const StyledIxnDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(IxnDashboard))`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  
`;
