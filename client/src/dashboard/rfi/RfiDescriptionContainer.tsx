import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../utils';
import theme from '../../resources/theme';
import TgtPageButtonVector from '../../resources/icons/TgtPageButtonVector';
import ExternalLinkVector from '../../resources/icons/ExternalLinkVector';
import classNames from 'classnames';

interface MyProps {
  rfi: RfiModel|undefined;
  loadTgtPage: (rfi: RfiModel) => void;
  postGetsClick: (rfi: RfiModel) => void;
  className?: string
}

export const RfiDescriptionContainer: React.FC<MyProps> = (
  {rfi, loadTgtPage, postGetsClick, className}) => {
  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;

  const handleTgtClick = () => {
    if (rfi && rfi.status !== RfiStatus.PENDING) {
      setCookies('magpie', {...cookie, viewState: {rfiId: rfi.id, tgtId: undefined}});
      loadTgtPage(rfi);
    }
  };

  const handleGetsClick = () => {
    if (rfi) {
      postGetsClick(rfi);
      window.open(rfi.getsUrl, '_blank');
    }
  };

  return (
    <div className={className}>
      <div className={'button-section'}>
        <div className={classNames('navigate-to-tgt-button', 'button', 'no-select',
                                   rfi && rfi.status === RfiStatus.PENDING ? 'disabled' : null)}
             onClick={handleTgtClick}
        >
          <span>TGTs</span>
          <TgtPageButtonVector/>
        </div>
        <div className={classNames('gets-button', 'button', 'no-select')}
             onClick={handleGetsClick}
        >
          <span>GETS</span>
          <ExternalLinkVector/>
        </div>
      </div>
      <div className={'body'}>
        {rfi && rfi.completionDate ?
          <>
            <span className={'header header-projected-completion'}>{(rfi.status === RfiStatus.CLOSED ? '' :
              'Projected ') + 'Completion Date'}</span>
            <span className={'text-body projected-completion'}>{rfi.completionDate.format('DD MMMM YYYY')}</span>
          </>
          :
          null
        }
        <span className={'header'}>RFI Description</span>
        <span className={'text-body'}>{rfi ? rfi.description : null}</span>
        <span className={'header'}>Justification</span>
        <span className={'text-body'}>{rfi ? rfi.justification : null}</span>
        <span className={'header'}>Customer Information</span>
        <span className={'text-body'}>
          <span>{rfi ? `${rfi.customerTitle} ${rfi.customerSurname}, ${rfi.customerGivenName}` : null}</span>
          <span>{rfi ?
            `COMM: ${rfi.customerCommPhone}` +
            (rfi.customerDsnPhone === '' ? '' : ` / DSN: ${rfi.customerDsnPhone}`) +
            (rfi.customerSvoip === '' ? '' : ` / SVoIP: ${rfi.customerSvoip}`) +
            (rfi.customerTsvoip === '' ? '' : ` / TSVoIP: ${rfi.customerTsvoip}`)
            :
            null
          }</span>
          <span>{rfi ? rfi.customerEmail : null}</span>
        </span>
      </div>
    </div>
  );
};

export const StyledRfiDescriptionContainer = styled(RfiDescriptionContainer)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin-right: 26px;
  color: ${theme.color.fontActive};
  font-family: ${theme.font.familyHeader};
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRow};
  line-height: 19px;
 
  .button-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 49px;
    margin: 8px;
    cursor: pointer;
    
    span {
      margin-bottom: 4px;
    }
    
    :hover {
      text-shadow: 0 0 4px #FFF;
      svg {
        filter: drop-shadow(0 0px 4px #FFFFFF);
      }
    }
  }
  
  .navigate-to-tgt-button {
    span {
      margin-right: 4px;
    }
  }
    
  .gets-button {
    span {
      margin-right: 8px;
    }
  }
  
  .body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    overflow-y: auto;
    padding-right: 15px;
  }
  
  .header {
    color: ${theme.color.fontHeader};
    margin: 8px 0;
  }
  
  .header-projected-completion {
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
  }
  
  .text-body {
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .projected-completion {
    font-weight: ${theme.font.weightBolder};
  }

`;
