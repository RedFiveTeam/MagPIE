import * as React from 'react';
import styled from 'styled-components';
import RFIModel from '../RFIModel';
import classNames from 'classnames';
import { StyledRegionForPending } from '../region--pending/RegionForPending';
import { StyledRFITableHeader } from './RFITableHeader';
import { StyledRegionForOpen } from '../region--open/RegionForOpen';
import { StyledRegionForClosed } from '../region--closed/RegionForClosed';

interface Props {
  rfis: RFIModel[];
  className?: string;
}

export const RFITable: React.FC<Props> = props => {

  function renderShadowbox(scrollPos: any, scrollMax: any) {
    if (scrollPos > 0) {
      document.getElementById('tsb')!.classList.add('topShadow');
    } else {
      document.getElementById('tsb')!.classList.remove('topShadow');
    }

    if (scrollPos === scrollMax || document.getElementById('reg')!.style.overflow === 'visible') {
      document.getElementById('bsb')!.classList.remove('bottomShadow');
    } else {
      document.getElementById('bsb')!.classList.add('bottomShadow');
    }

  }

  return (
    <div className={classNames('rfi-table', props.className)}>
      <StyledRFITableHeader/>
      <div className={'shadowbox'} id={'tsb'} />
      <div className={classNames('shadowbox', 'bottomShadow')} id={'bsb'} />

      <div className={'regions'} id={'reg'} onScroll={() => {
        const a = document.getElementById('reg')!;

        return renderShadowbox(a.scrollTop, a.scrollHeight - a.offsetHeight);
      }}>



      <StyledRegionForPending rfis={props.rfis}/>
      <StyledRegionForOpen rfis={props.rfis}/>
      <StyledRegionForClosed rfis={props.rfis}/>
      </div>


    </div>
  );
};

export const StyledRFITable = styled(RFITable)`
width:${(props) => props.theme.table.tableWidth};

  .regions {
    overflow-y: auto;
    scrollbar-color: #ECECEC #0A0908;
    height: calc(100vh -  168px);
    z-index: 1;
    scroll-behavior: auto;
    font-family: ${(props) => props.theme.font.familyRow};
  }
 
  .shadowbox {
    width:${(props) => props.theme.table.rowWidth};
    height: calc(100vh -  168px);
    position: fixed;
    pointer-events: none;
    -moz-transition: .2s;
    -moz-transition-timing-function: ease-out;
  }
    
  .topShadow {
  
    box-shadow: inset 0 20px 12px -12px black;
  }  
  
  .bottomShadow {
    
    box-shadow: inset 0 -20px 12px -12px black;
  }  
  

  
  
`;

