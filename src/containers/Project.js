import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import {MdCheckBox, MdDelete, MdSync} from "react-icons/md";
import {FaExclamationTriangle, FaPlusCircle, FaRegCalendarAlt} from "react-icons/fa";
import Button from "@material-ui/core/es/Button/Button";
import {GoBookmark, GoPulse, GoSearch, GoSync, GoTasklist, GoTelescope} from "react-icons/go";
import {IoIosArchive, IoIosMoon, IoIosRefresh} from "react-icons/io";
import {NoteList} from "../components/project/notes/NoteList";
import {CreateNote} from "../components/project/notes/CreateNote";
import {CreateTask} from "../components/project/tasks/CreateTask";
import {Spinner} from "../components/Spinner";
import ProjectService from "../services/project.service";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

export class Project extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: this.props.data,
      page: 0,
      rowsPerPage: 5,
      expanded:[],
      filters:{
        category:[],
        status:[]
      },
      filterValue: '',
      project: {tasks:[]}

    };
  }

  componentDidMount() {
    this.loadProjectById(this.props.match.params.id)
  }

  loadProjectById = (id) => {
    this.setState({...this.state, project:{tasks:[]}, loading: true})
    ProjectService.getTasksByProjectId(id)
      .then((project) => this.setState({...this.state, project}))
      .catch((error) => console.log("Error occured when tried to load project."))
      .finally(()=> this.setState({loading: false}))
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.loadProjectById(this.props.match.params.id)
    }
  }


  update = (key, obj, taskId, noteId) => {
    if(key==='tasks'){
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          [key]: this.state.project[key].map(item => item.id === obj.id ? {...item, ...obj} : item)
        }
      });
    } else {
      let newArray = this.state.project.tasks.map((task, i )=> {
        if(task.id===taskId){
          let keyIndex = task.notes.findIndex(note=>note.id===noteId);
          task.notes.splice(keyIndex, 1,  {...task, ...obj});
          return task;
        } else return task;
      });
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          tasks: newArray
        }
      })
    }
  };

  create = (key, obj, taskId) => {
    if(key==='tasks'){
      let newTasks = this.state.project.tasks.slice(0);
      newTasks.push(obj);
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          tasks: newTasks
        }
      })
    } else {
      let newTasks = this.state.project.tasks.map((task, i)=> {
        if(task.id===taskId){
          task.notes.push({...obj});
          return task;
        } else return task;
      });
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          tasks: newTasks
        }
      })
    }
  };

  remove = (key, obj, taskId, noteId) => {
    if(key==='tasks'){
      if(obj && obj.id){
        this.setState({
          ...this.state,
          project:{
            ...this.state.project,
            [key]: this.state.project[key].filter(item => item.id !== obj.id)
          }
        });
      }
    } else {
      let newArray = this.state.project.tasks.map((task )=> {
        if(task.id===taskId){
          let keyIndex = task.notes.findIndex(note=>note.id===noteId);
          task.notes.splice(keyIndex, 1);
          return task;
        } else return task;

      });
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          tasks: newArray
        }
      })
    }
  };

  multipleRemove = (key) => {
    let newArr = this.state.project[key].filter(item=>this.state.selected.indexOf(item.id)<0)
    this.setState({
      ...this.state,
      selected:[],
      project:{
        ...this.state.project,
        [key]: newArr
      }
    });
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  dataWithFiltersApplied = () => {
    const statusFilters = [];
    const categoryFilters = [];
    if(this.state.filters.status.length){
      this.state.filters.status.map(item=>statusFilters.push(item.name));
    }
    if(this.state.filters.category.length){
      this.state.filters.category.map(item=>categoryFilters.push(item.name));
    }

    return this.state.project.tasks ? this.state.project.tasks
            .filter(item => this.state.filterValue ? item.title.trim().toLowerCase().indexOf(this.state.filterValue)>=0 : item)
            .filter(item => statusFilters.length ? statusFilters.indexOf(item.status) >= 0 : item)
            .filter(item => {
              if(!categoryFilters.length) return item;
              let taskCategories = [];
              item.categories.map(item=>taskCategories.push(item.name));
              let found = categoryFilters.some(r=> taskCategories.indexOf(r) >= 0);
              return found ? item : undefined;
            }) : [];
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      let data = this.dataWithFiltersApplied();
      this.setState({selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  toggleCategory = ( event, id, category ) =>{
    event.stopPropagation();
    let task = this.state.project.tasks.find(item=>item.id === id);
    if(task.categories && task.categories.length){
      let taskIndex = task.categories.findIndex(item=>item.name === category.name) !== -1;
      let newArr = [];
      if(taskIndex){
        newArr = task.categories.filter(item => item.id!== category.id);
      } else {
        newArr = task.categories.slice(0);
        newArr.push(category);
      }
      this.update('tasks', {id, categories:newArr})
    } else {
      this.update('tasks', {id, categories:[category]})
    }
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  updateStatus = (event, id, status) => {
    event.stopPropagation();
    this.update('tasks', {id, status})
  };

  existsInFilters = (key, obj) => {
    return this.state.filters[key].findIndex(item => item.id === obj.id) !== -1;
  };

  toggleFilter = (key, obj) => {
    if(this.state.filters[key].length){
      let filterIndex = this.state.filters[key].findIndex(item=>item.id === obj.id) !== -1;
      let newArr = [];
      if(filterIndex){
        newArr = this.state.filters[key].filter(item => item.id!== obj.id);
      } else {
        newArr = this.state.filters[key].slice(0);
        newArr.push(obj);
      }
      this.setState({
        ...this.state,
        filters:{
          ...this.state.filters,
          [key]: newArr
        }
      })
    } else {
      this.setState({
        ...this.state,
        filters:{
          ...this.state.filters,
          [key]: [obj]
        }
      })
    }
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  toggleRowExpansion = (id) => {
    this.setState({
      ...this.state,
      expanded: this.state.expanded.indexOf(id) >= 0 ? this.state.expanded.filter(itemId=> itemId !== id) : [...this.state.expanded, id]
    });
  };

  preventDefaultBehaviour = (event) => {
    event.preventDefault();
  };

  filterTasks = (event) => {
    event.preventDefault();
    let filterValue = event.target.value;
    if(filterValue && filterValue.trim()){
      this.setState({
        ...this.state,
        filterValue:filterValue.trim().toLowerCase()
      })
    } else {
      this.setState({
        ...this.state,
        filterValue:''
      })
    }
  }

  render() {
    let { order, orderBy, rowsPerPage, page } = this.state;

    const taskCategories = [
      {id:1, name:"important"},
      {id:2, name:"overdue"},
      {id:3, name:"bookmark"},
      {id:4, name:"observe"},
      {id:5, name:"snooze"},
      {id:6, name:"archive"},
    ];

    const columns = [
      { id: 'category-controls',              sortable:false,  numeric: false, disablePadding: true, label: '', width:"300px"},
      { id: 'project',               sortable:false,  numeric: false, disablePadding: true, label: ''},
      { id: 'id',                    sortable:false,  numeric: false, disablePadding: true, label: '' },
      { id: 'title',                 sortable:false,  numeric: false, disablePadding: true, label: '', width:"300px" },
      { id: 'status',                sortable:false,  numeric: false, disablePadding: true, label: '' },
      { id: 'status-controls', sortable:false,  numeric: false, disablePadding: true, label: '', width:"120px"},
      { id: 'Time',                  sortable:false,  numeric: false, disablePadding: true, label: ''},
    ];

    let data = this.dataWithFiltersApplied();

    return (
      <div className="margin-top">
        <CreateTask onCreate={this.create}/>
        <form onSubmit={this.preventDefaultBehaviour} className="search-project-form pull-right">
          <TextField type="text" autoComplete="off" placeholder="Enter the task title..." id="searchTask" label="" fullWidth onKeyUp={this.filterTasks} InputProps={{startAdornment: (<InputAdornment position="start"><GoSearch /></InputAdornment>)}}/>
        </form>
        <div className="clear"/>

        <div className="text-center">
          {this.state.loading &&  <Spinner spin={this.state.loading}/>}
        </div>

        {!this.state.loading && (
        <div className="main">
          <div className=""><p className="project-name">{this.state.project.name}</p></div>
          <div className={this.state.selected.length > 0 ? "highlight-header table-header":"table-header"}>
            <div className={"col-xs-12 col-sm-12 col-lg-6 col-md-6 no-padding"}>
              {this.state.selected.length > 0 ? (<p className="table-header-title">{this.state.selected.length } selected</p>) : (<p className="table-header-title">Tasks</p>)}
            </div>
            <div className={"col-xs-12 col-sm-12 col-lg-6 col-md-6 no-padding text-right"}>
              {this.state.selected.length  > 0 ? (
                <div className="inline-block table-header-section">
                  <Tooltip title="REMOVE">
                    <Button variant="outlined" className="icon-only-button no-radius" onClick={()=>this.multipleRemove('tasks')}>
                      <MdDelete size={22} fill={"#e53935"}/>
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <div className="table-header-section">
                  {taskCategories.map((category) => (
                    <div key={category.id} className="inline-block">
                      <Tooltip title={category.name.toUpperCase()}>
                        <Button variant="outlined" className="icon-only-button no-radius" onClick={()=>this.toggleFilter('category', category)}>
                          {category.name==='important' && <FaExclamationTriangle className="table-row-icon important-icon" fill={this.existsInFilters('category', category) ? "#e53935": "#c7c0c0"} size={20}/>}
                          {category.name==="overdue" && <FaRegCalendarAlt className="table-row-icon important-icon" fill={this.existsInFilters('category', category) ? "#E58C0D": "#c7c0c0"} size={20}/>}
                          {category.name==="bookmark" && <GoBookmark className="table-row-icon bookmark-icon" fill={this.existsInFilters('category', category) ? "#388e3c" : "#c7c0c0"} size={20}/>}
                          {category.name==="observe" && <GoTelescope className="table-row-icon bookmark-icon" fill={this.existsInFilters('category', category) ? "#039be5" : "#c7c0c0"} size={22}/>}
                          {category.name==="snooze" && <IoIosMoon className="table-row-icon bookmark-icon" fill={this.existsInFilters('category', category) ? "#8e24aa" : "#c7c0c0"} size={22}/>}
                          {category.name==="archive" && <IoIosArchive className="table-row-icon bookmark-icon" fill={this.existsInFilters('category', category) ? "#8d6e63" : "#c7c0c0"} size={20}/>}
                        </Button>
                      </Tooltip>
                    </div>
                  ))}
                  <Tooltip title="TO DO"><Button variant="outlined" className="icon-only-button no-radius" onClick={()=>this.toggleFilter('status', {id:1, name:"start"})}> <GoTasklist size={20} fill={this.existsInFilters('status', {id:1, name:"start"}) ? "#E58C0D": "#c7c0c0"}/> </Button></Tooltip>
                  <Tooltip title="IN PROGRESS"><Button variant="outlined" className="icon-only-button no-radius" onClick={()=>this.toggleFilter('status', {id:2, name:"progress"})}> <GoPulse fill={this.existsInFilters('status', {id:2, name:"progress"}) ? "#039be5" : "#c7c0c0"}/> </Button></Tooltip>
                  <Tooltip title="DONE"><Button variant="outlined" className="icon-only-button no-radius" onClick={()=>this.toggleFilter('status', {id:3, name:"done"})}> <MdCheckBox size={22} fill={this.existsInFilters('status', {id:3, name:"done"}) ? "#388e3c" : "#c7c0c0"}/> </Button></Tooltip>
                </div>)}
            </div>
          </div>

          <div className="clear"/>

          <div className="tableWrapper">
            <Table className="table"  aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {data.length > 0 && <Checkbox color="default" className={(this.state.selected.length === data.length && data.length!==0) ? "checkbox-selected":"checkbox-not-selected"} indeterminate={this.state.selected.length > 0 && this.state.selected.length < data.length} checked={this.state.selected.length === data.length && data.length!==0} onChange={this.handleSelectAllClick}/>}
                  </TableCell>
                  {columns.map((row)=> (
                    <TableCell key={row.id} width={row.width} align={row.numeric ? 'right' : 'left'} padding={'dense'} sortDirection={orderBy === row.id ? order : false}>
                      {row.sortable ?  (<Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                        <TableSortLabel active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)}>{row.label}</TableSortLabel>
                      </Tooltip>) : (<span className="label">{row.label}</span>)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {(!data.length && !this.state.loading) && (<tr><td className="small-margin-top inline-block no-results-paragraph" width="100%" colSpan={7}>We couldn't find any data.</td></tr>)}
                {this.stableSort(data, this.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n) => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <React.Fragment key={n.id}>
                      <TableRow hover onClick={() => this.toggleRowExpansion(n.id)} role="checkbox" aria-checked={isSelected} tabIndex={-1}  selected={isSelected} className="enhanced-table-row">
                        <TableCell width={"50px"} padding="checkbox">
                          <Checkbox className={isSelected ? "checkbox-selected":"checkbox-not-selected"} onClick={(event)=>this.handleCheckboxClick(event, n.id)} checked={isSelected} color={"default"} />
                        </TableCell>

                        <TableCell className={"text-justify"} align="left" padding="none">
                          {taskCategories.map(category=>(
                            <div key={category.id} className="col-xs-4 col-sm-4 col-md-2 col-lg-2 no-padding">
                              <Tooltip title={category.name.toUpperCase()}>
                                <Button variant="outlined" className="icon-only-button no-radius" onClick={(event)=>this.toggleCategory(event, n.id, category)}>
                                  {category.name==='important' && <FaExclamationTriangle className="table-row-icon important-icon" fill={n.categories.findIndex(category => category.name === 'important') !== -1 ? "#e53935": "#c7c0c0"} size={20}/>}
                                  {category.name==="overdue" && <FaRegCalendarAlt className="table-row-icon important-icon" fill={n.categories.findIndex(category => category.name === 'overdue') !== -1  ? "#E58C0D": "#c7c0c0"} size={20}/>}
                                  {category.name==="bookmark" && <GoBookmark className="table-row-icon bookmark-icon" fill={n.categories.findIndex(category => category.name === 'bookmark') !== -1  ? "#388e3c" : "#c7c0c0"} size={20}/>}
                                  {category.name==="observe" && <GoTelescope className="table-row-icon bookmark-icon" fill={n.categories.findIndex(category => category.name === 'observe') !== -1  ? "#039be5" : "#c7c0c0"} size={22}/>}
                                  {category.name==="snooze" && <IoIosMoon className="table-row-icon bookmark-icon" fill={n.categories.findIndex(category => category.name === 'snooze') !== -1  ? "#8e24aa" : "#c7c0c0"} size={22}/>}
                                  {category.name==="archive" && <IoIosArchive className="table-row-icon bookmark-icon" fill={n.categories.findIndex(category => category.name === 'archive') !== -1  ? "#8d6e63" : "#c7c0c0"} size={20}/>}
                                </Button>
                              </Tooltip>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell >{n.project.name}</TableCell>
                        <TableCell align="left">#{n.id}</TableCell>
                        <TableCell align="left">{n.title}</TableCell>
                        <TableCell>
                          {n.status === 'start' && <Tooltip title="TO DO"><GoTasklist fill={"#ff6f00"} size={20}/></Tooltip>}
                          {n.status === 'done' && <Tooltip title="DONE"><MdCheckBox size={20} fill="#388e3c"/></Tooltip>}
                          {n.status === 'progress' && <Tooltip title="IN PROGRESS"><GoPulse size={20} fill={"#039be5"}/></Tooltip>}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          <span id={"hidden-controls-right-"+n.id}>
                            {n.status === 'start' && (
                              <Tooltip title="IN PROGRESS">
                                <Button variant="outlined" className="icon-only-button no-radius" onClick={(event)=>this.updateStatus(event, n.id, 'progress')}> <GoPulse size={20} fill={"#c7c0c0"}/> </Button>
                              </Tooltip>)}
                            {n.status === 'done' && (<Tooltip title="IN PROGRESS"><Button variant="outlined" className="icon-only-button no-radius" onClick={(event)=>this.updateStatus(event, n.id, 'progress')}> <GoPulse size={20} fill={"#c7c0c0"}/> </Button></Tooltip>)}
                            {n.status === 'progress' && (
                              <div className="inline-block">
                                <div className="inline-block">
                                  <Tooltip title="TO DO"><Button variant="outlined" className="icon-only-button no-radius" onClick={(event)=>this.updateStatus(event, n.id, 'start')}> <GoTasklist size={20} fill={"#c7c0c0"}/> </Button></Tooltip>
                                </div>
                                <div className="inline-block">
                                  <Tooltip title="DONE"><Button variant="outlined" className="icon-only-button no-radius" onClick={(event)=>this.updateStatus(event, n.id, 'done')}> <MdCheckBox size={22} fill="#c7c0c0"/> </Button></Tooltip>
                                </div>
                              </div>)}
                          </span>
                        </TableCell>
                        <TableCell align="left"><span className="label">Just now</span></TableCell>
                      </TableRow>
                      <TableRow className={this.state.expanded.indexOf(n.id)>=0 ? "":"hidden"}>
                        <TableCell colSpan={8}>
                          <p className="label">Description:</p>
                          <p className="small-line-spacing small-bottom-space standard-font-size">{n.description}</p>
                          <CreateNote taskId={n.id} onCreate={this.create}/>
                          <NoteList taskId={n.id} notes={n.notes} onRemove={this.remove} onUpdate={this.update}/>
                        </TableCell>
                      </TableRow>
                      </React.Fragment>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{'aria-label': 'Previous Page'}}
            nextIconButtonProps={{'aria-label': 'Next Page',}}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>)}
      </div>
    );
  }
}
