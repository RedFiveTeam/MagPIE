import styled from "styled-components";
import * as React from "react";
import {ScoreBoardMetricModel} from "../ScoreBoardMetricModel";

interface MyProps {
    ratings: ScoreBoardMetricModel[];
    className?: string;
}

export const ScoreBoardContainer: React.FC<MyProps> = (props) => {

    function sortByAscendingRating(ratings: ScoreBoardMetricModel[]) {
        return ratings.sort(function (a, b) {
            return a.approvalRating > b.approvalRating ? -1 : 1;
        });
    }

    return (
        <div itemType={'container'} className={'scoreboard'}>
            <header className={'scoreboard-header'}>
                <div className={'rank-column-title'}>
                    <h4>
                        Rank
                    </h4>
                </div>
                <div className={'rating-column-title'}>
                    <h4>
                        Approval Rating
                    </h4>
                </div>
            </header>
            <div className={'scoreboard-body'}>
                {props.ratings ? sortByAscendingRating(props.ratings).map((row: any, index: number) =>
                    <div className={'scoreboard-row'} key={index}>
                        <div className={'row-background'}>
                            <div className={'rank-background'}>
                                <div className={'user-rank'}>{index + 1}</div>
                            </div>
                            <div className={'user-name'}> {row.userName}</div>
                            <div className={'approval-rating'}>{row.approvalRating}%</div>
                        </div>
                    </div>) : ""}
            </div>
            <div className={'bottom-cap'}/>
        </div>
    )
};

export const StyledScoreBoardContainer = styled(ScoreBoardContainer)``;