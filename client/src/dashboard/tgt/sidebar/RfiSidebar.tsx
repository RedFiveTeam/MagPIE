import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import RfiModel from '../../../store/rfi/RfiModel';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { StyledMiniRfiRow } from './MiniRfiRow';
import { StyledMiniRfiRegion } from './MiniRfiRegion';
import ScrollShadow from 'react-scroll-shadow';
import theme from '../../../resources/theme';
import HtmlTooltip from '../../components/HtmlToolTip';
import classNames from 'classnames';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../../utils';
import { CollapseButton, ExpandButton } from '../../../resources/icons/ExpandCollapseButton';
import { postCollapseClick } from '../../../store/metrics';


interface MyProps {
  rfi: RfiModel;
  selectRfi: (rfi: RfiModel) => void;
  className?: string;
}

function printRows(rfis: RfiModel[], selectedRfiId: number, selectRfi: (rfi: RfiModel) => void, collapsed: boolean) {
  return rfis.map((rfi: RfiModel, index: number) =>
                    <StyledMiniRfiRow rfi={rfi} key={index} index={index} selected={selectedRfiId === rfi.id}
                                      selectRfi={selectRfi} collapsed={collapsed}/>,
  );
}

export const RfiSidebar: React.FC<MyProps> = (props) => {
  let openRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.openRfis);
  let closedRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.closedRfis);
  const [collapsed, setCollapsed] = useState(false);
  const [cookies] = useCookies(['magpie']);
  const cookie: Cookie = cookies.magpie;

  const handleCollapseClick = () => {
    setCollapsed(!collapsed);
    postCollapseClick(cookie.userName)
      .catch(reason => console.log('Failed to post click collapse metric: ' + reason));
  };

  let bgWidth = collapsed ? '82px' : '210px';

  return (
    <div className={props.className}>
      <div className={classNames('sidebar-container', 'no-select', collapsed ? 'collapsed' : null)}>
        <ScrollShadow
          bottomShadowColors={{
            active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, #041319 0%, #1B2326 ${bgWidth}, ${theme.color.backgroundBase} ${bgWidth});`,
          }}
          topShadowColors={{
            active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, #041319 0px, #1B2326 ${bgWidth}, ${theme.color.backgroundBase} ${bgWidth});`,
          }}
          shadowSize={10}
        >
          <HtmlTooltip
            title={
              <div className={'collapse-rfi--container'} onClick={handleCollapseClick}>
                {collapsed ?
                  <ExpandButton className={'expand-button'}/>
                  :
                  <CollapseButton className={'collapse-button'}/>
                }
              </div>}
            placement={'right-start'}
            PopperProps={{
              popperOptions: {
                modifiers: {
                  offset: {
                    enabled: true,
                    offset: collapsed ? '1, -124px' : '1, -252px',
                  },
                },
              },
            }}
            interactive
            leaveDelay={100}
          >
            <div className={collapsed ? 'mini-rfi-table-collapsed' : 'mini-rfi-table'}>
              {openRfis.length > 0 ?
                <StyledMiniRfiRegion
                  title={collapsed ? 'pri' : 'prioritized'}
                  collapsed={collapsed}
                  emptyMessage={''}
                >
                  {printRows(openRfis, props.rfi.id, props.selectRfi, collapsed)}
                </StyledMiniRfiRegion>
                :
                null
              }
              <StyledMiniRfiRegion
                title={collapsed ? 'cld' : 'closed'}
                collapsed={collapsed}
                emptyMessage={''}
              >
                {printRows(closedRfis, props.rfi.id, props.selectRfi, collapsed)}
              </StyledMiniRfiRegion>
            </div>
          </HtmlTooltip>
        </ScrollShadow>
      </div>
    </div>
  );
};

export const StyledRfiSidebar = styled(RfiSidebar)`

  .sidebar-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(90deg, #041319 0px, #1B2326 210px, ${theme.color.backgroundBase} 210px);
    height: calc(100vh - 63px);
    margin-right: 5px;
  }
  
  .collapsed {
    background: linear-gradient(90deg, #041319 0px, #1B2326 82px, ${theme.color.backgroundBase} 82px) !important;
  }
  
  .mini-rfi-table {
    padding: 21px 32px 21px 8px;
  }
  
  .mini-rfi-table-collapsed {
    padding: 21px 20px 21px 8px;
  }
`;
