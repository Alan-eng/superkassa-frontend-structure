// @flow

import React from 'react';
import { connect } from 'react-redux';
import { type Travellers, type SearchSegment } from '../../reducers/searchForm';
import SinglePriceCalendar from './SinglePriceCalendar';

type Props = {
    formType: string,
    segments: Array<SearchSegment>,
    travellers: Travellers,
};

const mapStateTopProps = state => ({
    formType: state.searchForm.formType,
    segments: state.searchForm.segments,
    travellers: state.searchForm.travellers,
});

const MultiPriceCalendar = (props: Props): React.Element<*> => (
    <div className="multiCalendar">
        {props.segments.map((segmentData, segmentNumber) => {
            if (!segmentData.from || !segmentData.to) {
                return null;
            }
            // @FIXME(2017-10-04|vs): dirty hack
            if (props.formType === 'ow' && segmentNumber > 0) {
                return null;
            }
            return (
                <SinglePriceCalendar
                    key={`${segmentData.from.iata_code}-${segmentData.to.iata_code}}`}
                    segmentNumber={segmentNumber}
                    segmentData={segmentData}
                    travellers={props.travellers}
                />
            );
        })}
    </div>
);

export default connect(mapStateTopProps)(MultiPriceCalendar);
