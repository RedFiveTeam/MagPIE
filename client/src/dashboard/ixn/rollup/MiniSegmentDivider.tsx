import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';

interface Props {
  segment: SegmentModel|null;
  className?: string;
}

export const MiniSegmentDivider: React.FC<Props> = props => {

  return (
    <div className={classNames(props.className)}>
      <div className={'segment-divider-placeholder'}>
        <div className={'segment-divider--bar'}/>
        <div className={'segment-divider--box'}>
          <div className={'add-segment-form'}>
            <div className={classNames('segment-value', 'segment-start')}>
              {props.segment!.startTime.format('HH:mm:ss') + 'Z'}
            </div>
            <div className={'segment-spacer'}>
              <span>-</span>
            </div>
            <div className={classNames('segment-value', 'segment-end')}>
              {props.segment!.endTime.format('HH:mm:ss') + 'Z'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StyledMiniSegmentDivider = styled(MiniSegmentDivider)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .segment-divider-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .segment-divider--bar {
    margin-bottom: -4px;
    width: 464px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: ${theme.color.segmentDivider};
    border: 2px solid;
  }
  
  .segment-spacer {
    width: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .segment-divider--box {
    width: 306px;
    height: 30px;
    background: ${theme.color.backgroundHeader};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: ${theme.color.segmentDivider};
    border: 4px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
    z-index: 2;
  }
  
  .add-segment-form {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;
