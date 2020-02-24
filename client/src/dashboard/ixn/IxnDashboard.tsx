import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../store/tgt/TargetModel';
import classNames from 'classnames';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { StyledIxnDashboardHeader } from './IxnDashboardHeader';
import { Box, createMuiTheme } from '@material-ui/core';
import { crayonBox } from '../../resources/crayonBox';
import { ExploitationLogButtonVectorSmall } from '../../resources/icons/ExploitationLogButtonVector';
import { StyledIxnTable } from './IxnTable';
import { StyledSegmentDivider } from './SegmentDivider';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { updateSegment } from '../../store/ixn';
import theme from '../../resources/theme';


interface Props {
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  const [addSegment, setAddSegment] = useState(false);

  const target: TargetModel = useSelector(({ixns}: ApplicationState) => ixns.target);
  const segments: SegmentModel[] = useSelector(({ixns}: ApplicationState) => ixns.segments);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: crayonBox.skyBlue,
      },
      secondary: {
        main: "#323232"
      }
    },
  });
  const dispatch = useDispatch();

  const handlePostSegment = (segment: SegmentModel) => {
    setAddSegment(false);
    dispatch(updateSegment(segment));
  };

  function printSegments(segmentList: SegmentModel[]) {
    return segmentList.map((segment: SegmentModel, index: number) =>
      <StyledSegmentDivider
        target={target}
        segment={segment}
        key={index}
        postSegment={handlePostSegment}
      />
    );
  }

  return (
    <div className={classNames(props.className)}>
      <StyledIxnDashboardHeader
        target={target}
      />
      <div className={'ixn-dash-body'}>
        <StyledIxnTable>
          {printSegments(segments)}
          {addSegment ?
            <StyledSegmentDivider
              className={'segment-divider-placeholder'}
              target={target}
              segment={null}
              postSegment={handlePostSegment}
            />
            :
            null
          }
        </StyledIxnTable>

        <div className={'add-segment-button-container'}>
          <Box
            height={42}
            width={160}
            border={2}
            borderRadius={21}
            borderColor={crayonBox.safetyOrange}
            bgcolor={theme.palette.secondary.main}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingRight={0.45}
            paddingLeft={1.8}
            fontSize={12}
            onClick={() => {
              setAddSegment(true);
              setTimeout(() => {
                if (document.getElementById('ixn-table-scrollable-region') !== null)
                  document.getElementById('ixn-table-scrollable-region')!.scrollTo(0, document.getElementById('ixn-table-scrollable-region')!.scrollHeight);
              }, 50);
            }}
            className={classNames(
              "add-segment-button",
              "no-select",
              addSegment ? 'add-segment-button-disabled' : null
            )}
          >
            Add Segment
            <ExploitationLogButtonVectorSmall/>
          </Box>
        </div>
      </div>
    </div>
  )
};


const mapStateToProps = ({ixns}: ApplicationState) => ({
  target: ixns.target,
});

const mapDispatchToProps = {};

export const StyledIxnDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(IxnDashboard))`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  .add-segment-button-container {
    height: 62px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .add-segment-button {
    cursor: pointer; 
    font-weight: bold;
    font-size: 16px;
    
    :hover {
      box-shadow: 0 0 8px #FFFFFF;
    }
  }
  
  .add-segment-button-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .add-segment-vector {
    margin-left: -33px;
    margin-bottom: -4px;
    pointer-events: none;
  }
  
  AddDateVector {
    pointer-events: none;
  }
  
  .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
  }
  
  .ixn-dash-body {
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .segment-divider-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 27px;
  }
  
  .segment-divider--bar {
    margin-bottom: -4px;
    width: 1430px;
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
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: ${theme.color.segmentDivider};
    border: 4px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .add-segment-form {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;
