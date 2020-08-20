import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import { StyledStarRating } from '../../resources/icons/StarRating';
import { useParams } from 'react-router';
import { postRfiFeedback } from '../../store/rfi';
import RfiFeedbackModel from '../../store/rfi/RfiFeedbackModel';

// interface FeedbackParams {
//   rfiNum: string
// }

interface Props {
  // match: match<FeedbackParams>
  className?: string;
}

export const FeedbackDashboard: React.FC<Props> = (props) => {
//grab finished star from chris and import into material ui component
//grab rfi title and description value from fetch
  const [selected, setSelected] = useState(-1);
  const [lastSelected, setLastSelected] = useState(-1);
  const [glow, setGlow] = useState(-1);
  const [description, setDescription] = useState('');

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const {rfiNum} = useParams();

  useEffect(() => {
    if (rfiNum) {
      fetch(`/api/rfi/rfi-description?rfiNum=${rfiNum}`,
            {
              method: 'get',
            })
        .then(response => response.text())
        .then(text => setDescription(text))
        .catch(reason => console.log(`Fetch failed: ${reason}`));
    }
  }, [rfiNum]);

  const handleSetNoGlow = (glow: number) => {
    setGlow(-1);
    setSelected(glow);
  };

  const handleSetSelect = (select: number) => {
    setSelected(select);
    setLastSelected(select);
    setGlow(-1);

    if (rfiNum) {
      postRfiFeedback(new RfiFeedbackModel(rfiNum, select));
      setFeedbackSubmitted(true);
    }
  };

  const handleSetGlow = (glow: number) => {
    setGlow(glow);
    if (selected > glow) {
      setLastSelected(selected);
      setSelected(glow);
    }
  };

  return (
    <div className={classNames(props.className, 'feedback-dashboard')}>
      <div className={'rfi-title'}>{rfiNum ? `RFI: ${rfiNum}` : 'Error: Bad Link'}</div>
      <div className={'feedback-dialogue'}>{feedbackSubmitted ? 'Thank You!' : 'How did we do?'}</div>
      <div className={classNames('star-container', rfiNum ? null : 'disabled')}
           onMouseOut={() => handleSetNoGlow(lastSelected)}>
        {[1, 2, 3, 4, 5].map(index => {
          return (
            <StyledStarRating
              setGlow={() => handleSetGlow(index)}
              setSelected={() => handleSetSelect(index)}
              selected={selected >= index}
              lastSelected={lastSelected >= index}
              glow={glow >= index}
              key={`Star-${index}`}
            />
          );
        })}
      </div>
      <div className={'rfi-description'}>
        <div className={'description-title'}>
          RFI Description
        </div>
        <div className={'description'}>
          {rfiNum ? description : 'You have navigated to an invalid link.'}
        </div>
      </div>
    </div>
  );
};

export const StyledFeedbackDashboard = styled(FeedbackDashboard)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${theme.color.backgroundBase};
  font-family: ${theme.font.familyRow};
  font-size: ${theme.font.sizeHeader};
  color: ${theme.color.fontActive};
  
  .feedback-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 95px;
  }
  
  .rfi-title {
    font-weight: ${theme.font.weightBold};
    font-size: ${theme.font.sizeBigMetric};
    color: #617886;
    line-height: 21px;
    margin-top: 110px;
  }
  
  .feedback-dialogue {
    color: ${theme.color.fontHeader};
    font-size: ${theme.font.sizeModalHeader};
    font-weight: ${theme.font.weightBold};
    line-height: 35px;
    text-align: center;
  }
  
  .rfi-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-weight: ${theme.font.weightMedium};
    background: ${theme.color.backgroundModal};
    border-radius: 20px;
    line-height: 19px;
    width: 733px;
    height: 280px;
    padding: 8px 36px 36px;
    margin-bottom: 56px;
  }
  
  .description-title {
    color: ${theme.color.fontHeader};
    font-size: ${theme.font.sizeHeaderSmall};
    font-weight: ${theme.font.weightBold};
    line-height: 19px;
    text-align: center;
    padding-top: 8px;
    margin-bottom: 23px;
  }
  
  .description {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    word-wrap: normal;
    overflow-y: scroll;
    overflow-x: auto;
    font-size: ${theme.font.sizeHeaderSmall};
    padding-right: 8px;
  }
  
  .star-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 525px;
  }
`;
