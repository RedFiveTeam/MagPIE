import * as React from 'react';
import styled from 'styled-components';
import RfiModel from '../../../store/rfi/RfiModel';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { StyledMiniRfiRow } from './MiniRfiRow';
import { StyledMiniRfiRegion } from './MiniRfiRegion';
import ScrollShadow from 'react-scroll-shadow';
import theme from '../../../resources/theme';


interface MyProps {
  rfi: RfiModel;
  selectRfi: (rfi: RfiModel) => void;
  className?: string;
}

function printRows(rfis: RfiModel[], selectedRfiId: number, selectRfi: (rfi: RfiModel) => void) {
  return rfis.map((rfi: RfiModel, index: number) =>
                    <StyledMiniRfiRow rfi={rfi} key={index} index={index} selected={selectedRfiId === rfi.id}
                                      selectRfi={selectRfi}/>,
  );
}

export const RfiSidebar: React.FC<MyProps> = (props) => {
  let openRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.openRfis);
  let closedRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.closedRfis);

  return (
    <div className={props.className}>
      <ScrollShadow
        bottomShadowColors={{
          active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
          inactive: `linear-gradient(90deg, #041319 0%, #1B2326 91%, ${theme.color.backgroundBase} 91%);`,
        }}
        topShadowColors={{
          active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
          inactive: `linear-gradient(90deg, #041319 0%, #1B2326 91%, ${theme.color.backgroundBase} 91%);`,
        }}
        shadowSize={10}
      >
        <div className={'mini-rfi-table'}>
          <StyledMiniRfiRegion
            title={'prioritized'}
            emptyMessage={''}
          >
            {printRows(openRfis, props.rfi.id, props.selectRfi)}
          </StyledMiniRfiRegion>
          <StyledMiniRfiRegion
            title={'closed'}
            emptyMessage={''}
          >
            {printRows(closedRfis, props.rfi.id, props.selectRfi)}
          </StyledMiniRfiRegion>
        </div>
      </ScrollShadow>
    </div>
  );
};

export const StyledRfiSidebar = styled(RfiSidebar)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(90deg, #041319 0%, #1B2326 91%, ${theme.color.backgroundBase} 91%);
  height: calc(100vh - 63px);
  margin-right: 5px;
  
  .mini-rfi-table {
    padding: 21px 30px 21px 8px;
  }
`;
