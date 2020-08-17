import * as React from 'react';
import RfiModel from '../../store/rfi/RfiModel';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import theme from '../../resources/theme';
import DeleteButtonX from '../../resources/icons/DeleteButtonX';
import TextTooltip from './TextTooltip';
import { DownloadIcon } from '../../resources/icons/DownloadIcon';

interface MyProps {
  rfi: RfiModel;
  userName: string;
  hideModal: () => void;
  className?: string;
}

const FileDownloadModal: React.FC<MyProps> = (props) => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={() => props.hideModal()}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('file-download-modal', props.className)}
    >
      <div className={'modal-container'}>
        <div className={'modal-header'}>
          <div className={'close-button'} onClick={() => props.hideModal()}>
            <DeleteButtonX/>
          </div>
        </div>
        <div className={'modal-body'}>
          <div className={'file-icon'}>
            {props.rfi.productName ?
              <TextTooltip title={props.rfi.productName.length > 10 ? props.rfi.productName : ''}>
                <div className={'icon-container'}>
                  <img src={'fileIcon.png'} alt={'file icon'}/>
                  <span>
                  {
                    props.rfi.productName.length > 10 ?
                      props.rfi.productName.substring(0, 9) + '...' :
                      props.rfi.productName
                  }
                </span>
                </div>
              </TextTooltip>
              :
              null
            }
          </div>
          <div className={'spacer no-select'}>&nbsp;</div>
          <a
            href={`/api/product?rfiId=${props.rfi.id}&userName=${props.userName}`}
            download={props.rfi.productName}
          >
            <div className={'download-button no-select'}>
              <DownloadIcon/>
              <span>Download</span>
            </div>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export const StyledFileDownloadModal = styled(FileDownloadModal)`
  .modal-container {
    width: 315px;
    height: 228px;
    margin-top: -162.5px;
    margin-left: -114px;
    background: ${theme.color.backgroundModal};
    border: 4px solid ${theme.color.backgroundFocus};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  
  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  
  .close-button {
    margin-top: 4px;
    margin-right: 4px;
  }
  
  .modal-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: available;
  }
  
  .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font.sizeHeaderSmall};
    color: ${theme.color.buttonBackgroundActive};
    font-weight: bold;
    
    span {
      margin-top: -40px;
      margin-bottom: 24px;
    }
  }
  
  a {
    text-decoration: none;
    outline: none;
  }
  
  .spacer {
    width: 12px;
  }
  
  .download-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 126px;
    height: 38px;
    border: 2px solid ${theme.color.downloadButtonBorder};
    background: ${theme.color.downloadButtonBackground};
    border-radius: 19px;
    padding-left: 2px;
    color: ${theme.color.fontActive};
    text-decoration:none;
    cursor: pointer;
    box-shadow: 0 2px 4px #000000;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
    
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      flex-grow: 1;
    }
  }
`;
