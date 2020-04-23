import * as React from 'react';
import styled from 'styled-components';
import RfiModel from '../../store/rfi/RfiModel';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import theme from '../../resources/theme';
import { useCookies } from 'react-cookie';
import AddTgtDateVector from '../../resources/icons/AddTgtDateVector';
import classNames from 'classnames';
import TextTooltip from '../components/TextTooltip';

interface OwnProps {
  exitTgtPage: () => void;
  rfi: RfiModel;
  editing: boolean;
  addDate: () => void;
  disabled: boolean;
  displayHelperText: boolean;
  className?: string;
}

export const TgtDashboardHeader: React.FC<OwnProps> = (props) => {
  const [cookie, setCookie] = useCookies(['magpie']);

  const handleExitClick = () => {
    setCookie('magpie', {...cookie.magpie, viewState: {rfiId: undefined, tgtId: undefined}});
    if (props.editing) {
      setTimeout(() => {
        props.exitTgtPage();
      }, 300);
    } else {
      props.exitTgtPage();
    }
  };

  const handleDateClick = () => {
    if (!props.disabled) {
      props.addDate();
      setTimeout(() => {
        let scrollToLocation = document.getElementById('tgt-table-scrollable-region');
        if (scrollToLocation !== null) {
          scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
        }
      }, 50);
    }
  };

  return (
    <div className={props.className}>
      <div className={'tgt-dash--header'}>
        <div className={'tgt-dash--header--back-button'} onClick={handleExitClick}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'tgt-dash--header--right-section'}>
          {props.displayHelperText ?
            <div className={'header-helper-text'}>Add additional coverage dates</div>
            :
            null
          }
          <TextTooltip
            title={'Add Exploit Date'}
            disableFocusListener={props.displayHelperText}
            disableHoverListener={props.displayHelperText}
            disableTouchListener={props.displayHelperText}
          >
            <div className={classNames('add-date-button', props.disabled ? 'disabled' : null)}
                 onClick={handleDateClick}
            >
              <AddTgtDateVector/>
            </div>
          </TextTooltip>
        </div>
      </div>
    </div>
  );
};

export const StyledTgtDashboardHeader = styled(TgtDashboardHeader)`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundHeader};
    box-shadow: 0 2px 20px #000000;
    z-index: 9999;
  }
  
  .tgt-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${theme.color.backgroundAction};
  }
  
  .header-helper-text {
    font-size: ${theme.font.sizeRegion};
    width: 250px;
    margin-left: -250px;
    height: 24px;
  }
  
  .tgt-dash--header--rfi-num {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .tgt-dash--header--right-section {
    width: 108px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
    
  .add-date-button {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    box-shadow: 1px 4px 5px #000;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`;
