import * as React from 'react';
import classNames from 'classnames';
import RefreshButtonVector from '../../../resources/icons/RefreshButtonVector';
import styled from 'styled-components';
import { SortKeyModel } from '../models/SortKeyModel';
import { useEffect } from 'react';

interface Props {
  fetchLocalUpdate: () => void;
  sortKey: SortKeyModel;
  postRefreshClick: () => Promise<any>;
  className?: string;
}

export const RfiTableHeaderButtonSection: React.FC<Props> = props => {
  function refreshPage() {
    props.postRefreshClick()
      .catch((reason => {console.log("Failed to post refresh click metric: " + reason)}));
    props.fetchLocalUpdate();
  }

  function refreshData() {
    props.fetchLocalUpdate();
  }

  useEffect(() => {
    setInterval(() => {
      refreshData();
    }, 5000)
  });

  return (
    <div className={classNames('header-cell', props.className)}>
      <button onClick={refreshPage} id={'refresh'} className={'refresh'}>
        <RefreshButtonVector />
      </button>
    </div>
  )
};

export const StyledButtonSection = styled(RfiTableHeaderButtonSection)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  
  .refresh {
    outline: none;
    align-items: normal;
    background-color: rgba(0,0,0,0);
    border-color: rgb(0, 0, 0);
    border-style: none;
    box-sizing: content-box;
    color: rgb(0, 0, 0); 
    cursor: pointer;
    display: inline;
    font: inherit;
    height: auto;
    padding: 0;
    perspective-origin: 0 0;
    text-align: start;
    text-decoration: underline;
    transform-origin: 0 0;
    width: auto;
    -moz-appearance: none;
    -webkit-logical-height: 1em; /* Chrome ignores auto, so we have to use this hack to set the correct height  */
    -webkit-logical-width: auto; /* Chrome ignores auto, but here for completeness */
  }
`;
