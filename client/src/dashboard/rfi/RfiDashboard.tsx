 import * as React from 'react';
import { useState } from 'react';
import { StyledRfiTable } from './RfiTable';
import styled from 'styled-components';
import theme, { rowStyles } from '../../resources/theme';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { fetchLocalUpdate, fetchRfis, reorderRfis } from '../../store/rfi/Thunks';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import {
  loadUserMetricsPage, postProductDelete, postProductUndoDelete, postProductUploadRfiPage, postRfiPriorityUpdate,
  reprioritizeRfis,
  sortRfis,
} from '../../store/rfi';
import { StyledRfiDescriptionContainer } from './RfiDescriptionContainer';
import { loadTgtPage } from '../../store/tgt/Thunks';
import GetsClickRequestModel from '../../store/metrics/GetsClickRequestModel';
import { postGetsClick } from '../../store/metrics';
import { StyledRefreshButtonVector } from '../../resources/icons/RefreshButtonVector';
import TextTooltip from '../components/TextTooltip';
import { useSnackbar } from 'notistack';
import { PriorityUndoSnackbarAction, UndoSnackbarAction } from '../components/UndoSnackbarAction';
import { Cookie, formatRfiNum } from '../../utils';
import { useCookies } from 'react-cookie';
import MetricsButtonIcon from '../../resources/icons/MetricsButtonIcon';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';

interface MyProps {
  className?: string;
}

export const RfiDashboard: React.FC<MyProps> = (props) => {
  let pendingRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.pendingRfis);
  let openRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.openRfis);
  let closedRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.closedRfis);
  let rfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.rfis);
  let sortKey: SortKeyModel = useSelector(({rfiState}: ApplicationState) => rfiState.sortKey);

  const dispatch = useDispatch();

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const classes = rowStyles();
  const [cookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;

  let [refreshing, setRefreshing] = useState(false);
  let [displayOpenRfiConfirmationModal, setDisplayOpenRfiConfirmationModal] = useState(false);
  let [rfiToOpen, setRfiToOpen] = useState('');
  let [openRfiList, setOpenRfiList] = useState([] as RfiModel[]);
  let [newIndex, setNewIndex] = useState(-1);

  const [selectedRfiId, setSelectedRfiId] = useState(
    openRfis.length > 0 ? openRfis[0].id :
      pendingRfis.length > 0 ? pendingRfis[0].id :
        closedRfis.length > 0 ? closedRfis[0].id : -1,
  );

  let selectedRfi = rfis.find((rfi) => rfi.id === selectedRfiId);

  const copyRfis = (originalList: RfiModel[]): RfiModel[] => {

    let newList: RfiModel[] = [];
    for (let rfi of originalList) {
      newList.push({...rfi});
    }
    return newList;
  };

  const handleReorderUndo = (rfiList: RfiModel[], rfiNum: string) => {
    dispatch(reprioritizeRfis(rfiList));
    postRfiPriorityUpdate(rfiList, `?undo=${rfiNum}&userName=${cookie.userName}`)
      .then(response => response.json()).catch((reason) => {
      console.log(reason);
    })
      .then(success => {
        if (!success) {
          dispatch(fetchLocalUpdate());
        }
      });
  };

  const handleReorderRfis = (openRfis: RfiModel[], newRfis: RfiModel[], rfiNum: string, newIndex: number) => {
    let rfi = openRfis.find((rfi) => rfi.rfiNum === rfiNum);
    if (rfi) {
      let oldIndex = openRfis.indexOf(rfi);
      if (oldIndex !== newIndex) {
        let originalPriority: RfiModel[] = copyRfis(openRfis)
          .filter((rfi) => rfi.status === RfiStatus.OPEN);
        dispatch(reorderRfis(openRfis, rfiNum, newIndex, cookie.userName));
        enqueueSnackbar('RFI ' + formatRfiNum(rfiNum) + ' Prioritized', {
          action: (key) => PriorityUndoSnackbarAction(key, originalPriority, handleReorderUndo,
                                                      closeSnackbar, classes.snackbarButton, rfiNum),
          variant: 'info',
        });
      }
    } else {
      rfi = newRfis.find((rfi) => rfi.rfiNum === rfiNum);
      // Trying to open a new RFI by dragging it into the open section
      if (rfi) {
        let newOpenRfis = openRfis;
        newOpenRfis.push(rfi);
        setDisplayOpenRfiConfirmationModal(true);
        setRfiToOpen(rfiNum);
        setOpenRfiList(newOpenRfis);
        setNewIndex(newIndex)
      } else {
        console.log(`RFI ${rfiNum} not found`);
      }
    }
  };

  const handleOpenRfiSuccess = (json: any) => {
    if (json.result === 'success') {
      //reprioritize
      handleReorderRfis(openRfiList, [], rfiToOpen, newIndex);
    } else {
      enqueueSnackbar('Prioritization failed', {
        action: (key) => DismissSnackbarAction(key, closeSnackbar, 'dismiss-error'),
        variant: 'error',
      });
    }
    console.log(`opened ${rfiToOpen}`);
  };

  const openInGets = (rfiNum: string) => {
    return fetch('https://www.gets.agi.nga.smil.mil/action/REST/RFIAction/update_rfi_response/json/',
                 {
                   method: 'post',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                   },
                   body: `{"rfi":"${rfiNum}","responseStatus":"OPEN"}`,
                 },
    );
  };

  const handleOpenRfi = (rfiNum: string) => {
    openInGets(rfiNum)
      .then(response => response.json())
      .then(json => handleOpenRfiSuccess(json))
      .catch(() => {
        handleOpenRfiSuccess({result: 'fail'});
      });
  };

  const handleSortRfis = (field: Field) => {
    dispatch(sortRfis(field));
  };

  const handleLoadTgtPage = (rfi: RfiModel) => {
    dispatch(loadTgtPage(rfi, true));
  };

  const handlePostGetsClick = (rfi: RfiModel) => {
    dispatch(postGetsClick(new GetsClickRequestModel(rfi.status, rfi.getsUrl)));
  };

  const handleLoadUserMetricsPage = () => {
    dispatch(loadUserMetricsPage());
  };

  const handleRefreshClick = () => {
    setRefreshing(true);
    fetch('/api/rfi/refresh', {method: 'get'});
    setTimeout(() => {
      setRefreshing(false);
    }, 5050);
  };

  const handlePostProductUpload = (data: FormData, rfiId: number, userName: string) => {
    dispatch(postProductUploadRfiPage(data, rfiId, userName));
  }

  const handleDeleteProduct = (rfiId: number, productName: string) => {
    enqueueSnackbar(`${productName} Deleted`, {
      action: (key) => UndoSnackbarAction(key, rfiId, () => handleUndoDeleteProduct(rfiId),
                                          closeSnackbar, classes.snackbarButton),
      variant: 'info',
    });
    postProductDelete(rfiId, cookie.userName);
    dispatch(fetchRfis());
  };

  const handleUndoDeleteProduct = (rfiId: number) => {
    postProductUndoDelete(rfiId, cookie.userName);
    dispatch(fetchRfis());
  };

  document.onkeydown = checkKey;

  function checkKey(e: any) {
    let rfiId: number|undefined = undefined;
    if (selectedRfi) {
      //Up arrow
      if (e.keyCode === 38) {
        let index = rfis.indexOf(selectedRfi);
        if (index > 0) {
          rfiId = rfis[index - 1].id;
          setSelectedRfiId(rfiId);
        }
      }
      //Down arrow
      else if (e.keyCode === 40) {
        let index = rfis.indexOf(selectedRfi);
        if (index < rfis.length - 1) {
          rfiId = rfis[index + 1].id;
          setSelectedRfiId(rfiId);
        }
      }
      if (rfiId) {
        setTimeout(() => {
          let element = document.getElementById('rfi-row-' + rfiId);
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
          }
        }, 50);
      }
    }
  }

  return (
    <div className={props.className}>
      <div className={'rfi-dash--header'}>
        <div className={'refresh-spacer'}/>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'button-container'}>
          <TextTooltip title={'Metrics'}>
            <div className={'metrics-button'} onClick={handleLoadUserMetricsPage}>
              <MetricsButtonIcon/>
            </div>
          </TextTooltip>
          <TextTooltip title={'Refresh from GETS'}>
            <div className={'refresh-button'}
                 onClick={handleRefreshClick}
            >
              <StyledRefreshButtonVector className={refreshing ? 'refreshing' : undefined}/>
            </div>
          </TextTooltip>
        </div>
      </div>
      <div className={'rfi-dash--body'}>
        <StyledRfiTable
          pendingRfis={pendingRfis}
          openRfis={openRfis}
          closedRfis={closedRfis}
          reorderRfis={handleReorderRfis}
          sortKey={sortKey}
          selectRfi={setSelectedRfiId}
          selectedRfiId={selectedRfiId}
          sortRfis={handleSortRfis}
        />
        <div className={'divider-bar'}/>
        <StyledRfiDescriptionContainer
          rfi={selectedRfi}
          loadTgtPage={handleLoadTgtPage}
          postGetsClick={handlePostGetsClick}
          handlePostProductUpload={handlePostProductUpload}
          handleDeleteProduct={handleDeleteProduct}
          handleUndoDeleteProduct={handleUndoDeleteProduct}
        />
      </div>
      <ConfirmationModal
        display={displayOpenRfiConfirmationModal}
        message={'Prioritizing this RFI will change the'}
        message2={'status in GETS from NEW to OPEN'}
        message3={'Do you want to continue?'}
        setDisplay={setDisplayOpenRfiConfirmationModal}
        handleYes={() => {
          handleOpenRfi(rfiToOpen);
        }}
      />
    </div>
  );
};

export const StyledRfiDashboard = styled(RfiDashboard)`
  height: 100vh;
  width: 100%;
 
  @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(1080deg);
    }
  }
  
  .rfi-dash--body {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 129px);
  }
  
  .rfi-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundHeader};
    margin-bottom: 17px;
    padding: 0 43px;
  }
  
  .refresh-spacer {
    width: 21px;
  }
  
  .button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 75px;
  }
  
  .refreshing {
    svg {
      animation: spin linear 5s;
    }
  }
  
  .divider-bar {
    background: ${theme.color.backgroundHeader};
    box-shadow: 2px 2px 4px #000000;
    border-radius: 8px;
    width: 4px;
    height: 100%;
    margin: 0 25px;
  }
  .metrics-button {
    cursor: pointer;
  }
`;
