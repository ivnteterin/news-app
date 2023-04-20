import React, { useEffect } from 'react';
import './SourcesList.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import { fetchSources, selectSource } from '../../containers/store/thunks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function SourceList(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const historySearch = searchParams.get('source');

  useEffect(() => {
    props.fetchSources();
  }, []);

  const createList = props.sources.map((source, i) => {
    if (props.selectedSource === source.id || historySearch === source.id) {
      props.selectSource(source.id);
      return (
        <option selected id={source.id} value={i + 1} key={uuidv4()}>
          {source.name}
        </option>
      );
    }
    return (
      <option id={source.id} value={i + 1} key={uuidv4()}>
        {source.name}
      </option>
    );
  });
  createList.unshift(
    <option value='DEFAULT' key={uuidv4()}>
      All sources
    </option>,
  );

  function selectedSourceHandler() {
    const sourceFilter = document.getElementById('source-filter');
    const sourceId = sourceFilter.options[sourceFilter.selectedIndex].id;
    const sourceQuery = sourceId ? `?source=${sourceId}` : '';
    navigate({
      pathname: '/articles',
      search: `${sourceQuery}`,
    });
    props.selectSource(sourceId);
  }

  useEffect(() => {}, []);

  return (
    <div className='filters-container'>
      <div className='sources-select'>
        {props.error ? (
          ''
        ) : (
          <select
            defaultValue={'DEFAULT'}
            className='custom-select'
            id='source-filter'
            onChange={selectedSourceHandler}
          >
            {createList}
          </select>
        )}{' '}
      </div>
      {props.selectedSource ? <SearchBox id='search-filter' /> : ''}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sources: state.sources,
    error: state.error,
    selectedSource: state.selectedSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSources: () => dispatch(fetchSources()),
    selectSource: (sourceId) => dispatch(selectSource(sourceId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceList);

SourceList.propTypes = {
  article: PropTypes.any,
  error: PropTypes.any,
  selectedSource: PropTypes.any,
  fetchSources: PropTypes.func,
  selectSource: PropTypes.func,
  sources: PropTypes.any,
};
