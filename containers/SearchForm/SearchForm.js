// @flow

import React from 'react';
import { connect } from 'react-redux';
import SimpleSearchForm from './SimpleSearchForm';
import ComplexSearchForm from './ComplexSearchForm';
import { withLocales } from '../../hoc';
import type { FormType } from '../../reducers/searchForm';

type Props = {
    formType: FormType,
};

const mapStateTopProps = state => ({
    formType: state.searchForm.formType,
});

const SearchForm = (props: Props): React.Element<*> => (props.formType !== 'complex' ?
    <SimpleSearchForm /> : <ComplexSearchForm />);

export default withLocales(connect(mapStateTopProps)(SearchForm), 'search-form');
