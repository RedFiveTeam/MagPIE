import * as React from 'react';
import styled from 'styled-components';
import RFIModel from './RFIModel';
import classNames from 'classnames';
import { StyledRegionForPending } from './RegionForPending';
import { StyledRFITableHeader } from './RFITableHeader';
import { StyledRegionForOpen } from './RegionForOpen';
import { StyledRegionForClosed } from './RegionForClosed';

interface Props {
  rfis: RFIModel[];
  className?: string;
}

export const RFITable: React.FC<Props> = props => {


  // {
  //   // @ts-ignore
  //   document.getElementById('reg').addEventListener('scroll', event => {
  //
  //     // @ts-ignore
  //     if (document.getElementById('reg').scrollTop > 0) {
  //       // @ts-ignore
  //       document.getElementById('sb').className = 'shadowbox';
  //     } else {
  //       // @ts-ignore
  //       document.getElementById('sb').className = 'noshadowbox';
  //     }
  //   })
  // }

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
width:300px;

  .regions {
    padding-left: 6px;
    overflow-y: auto;
    height: calc(100vh -  168px);
    z-index: 1;
    scroll-behavior: auto;
  }
    
  .shadowbox {
    width:285px;
    height: calc(100vh -  168px);
    position: fixed;
    pointer-events: none;
  }
    
  .topShadow {
    box-shadow: inset 0 20px 12px -12px black;
  }  
  
  .bottomShadow {
    box-shadow: inset 0 -20px 12px -12px black;
  }  
  
  
`;

