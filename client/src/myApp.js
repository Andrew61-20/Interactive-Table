import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import Table from './Table/Table';
import TableSearch from './TableSearch/TableSearch';
import MapCont from './Map/Map';

const pageSize = 10;
let pageCount;
let filteredData=null;

class App extends Component {

  state = {
    data: [],
    sort: 'asc',
    sortField: 'id',
    currentPage: 0,
    search: '',
  };
  
  componentDidMount() {
    (async () => {
      try {
        const response = await axios.get("api/jobs")
        this.setState ({data: response.data})
        return this.state.data
      } catch (err) {
        throw new Error(err.message)
      }
    })()
    const {data, sortField, sort} = this.state
    this.setState({
      data: _.orderBy(data, sortField, sort)
    })
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  getFilteredData(){
    const {data, search} = this.state;
    if (!search) {
      return data
    };
    if (data.some(el => {
      return el['job_title'].toLowerCase().includes(search.toLowerCase())}) === false) {
      return null
    } else {return data.filter(el => {
        return el['job_title'].toLowerCase().includes(search.toLowerCase())
    })};
  }

  onRemove = (id) => {
    const {data} = this.state;
    this.setState({data: data.filter(el => {
        return el._id !== id
    })})
  }

  getMapComponent = (x, y) => {
    const element = <MapCont x={x} y={y} />;
    ReactDOM.render(element, document.getElementById('root'));
  }
      
  render() {
    const {data,currentPage,sort,sortField} = this.state;
    let displayData = [];
    filteredData = this.getFilteredData();
    if (data.length !== 0 && filteredData !== null) {
      displayData = _.chunk(filteredData, pageSize)[currentPage];
      if (displayData !== undefined && displayData.length === 0) {
        displayData = []
      }
      pageCount = Math.ceil(filteredData.length / pageSize);
    };
          
    return (
      <div className="container">
        {<React.Fragment>
          <TableSearch onSearch={this.searchHandler}/> 
          <Table 
            data={displayData}
            onSort={this.onSort}
            onRemove={this.onRemove}
            onMapComponent={this.getMapComponent}
            sort={sort}
            sortField={sortField}
          />
        </React.Fragment>
        }
        { data.length > pageSize ?
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={currentPage}
          /> : null
        }
      </div>
    );
  }
}

export default App;
