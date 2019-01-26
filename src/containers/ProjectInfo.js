import React from "react";
import {Component} from "react";
import {ProjectLinkItem} from "../components/ProjectLinkItem";
import {FaRegFile} from "react-icons/fa";
import Typography from "@material-ui/core/es/Typography/Typography";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import {GoLinkExternal, GoNote, GoSearch, GoTasklist} from "react-icons/go";
import {ProjectFileItem} from "../components/ProjectFileItem";
import {ProjecNoteItem} from "../components/ProjectNoteItem";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import {CreateTask} from "../components/project/tasks/CreateTask";
import {TaskList} from "../components/project/tasks/TaskList";

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default class ProjectInfo extends Component{

  constructor(props){
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.createTask = this.createTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTaskDescription = this.updateTaskDescription.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
    this.state = {
      activeTab:0,
      project: {
        project: "Maximillian Swartzmuller",
        tasks:[
          {id:1, status:false, description:"This is some dumb description"},
          {id:2, status:false, description:"For some other stuff"},
          {id:3, status:false, description:"Colors here"},
          {id:4, status:false, description:"Read about this"},
          {id:5, status:false, description:"Range pickers pdf"}
        ],
        notes:[
          {author:"Ivan Vulovic", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut doloribus eligendi iure magni maxime mollitia nisi. Earum excepturi iusto nostrum reiciendis saepe tempora vitae voluptates. Debitis, dicta, vitae! Aperiam cumque eos esse nisi, obcaecati quisquam! Aliquam aperiam architecto dignissimos eligendi facilis, iure laborum magni neque nihil porro repellendus repudiandae soluta, ut. Ab aspernatur assumenda atque consequatur consequuntur corporis cum earum eos error esse ex expedita fugiat hic ipsam ipsum iure magnam maxime mollitia nemo nesciunt obcaecati odio officia quas quasi quidem quo quod reiciendis repellat sapiente sequi sint, vero voluptate voluptatum. Animi aspernatur autem cumque debitis, dignissimos eius esse eveniet maiores, minima minus possimus quibusdam ratione suscipit, ut vitae! Alias asperiores consectetur facilis natus perspiciatis quas sit voluptatibus? Animi architecto aut, consequatur corporis deserunt fuga itaque iusto libero, maxime, necessitatibus non possimus repellendus rerum totam voluptatibus! Alias aliquid blanditiis consectetur consequuntur delectus ea incidunt quam reprehenderit repudiandae vel! A accusamus corporis culpa cupiditate delectus deserunt distinctio incidunt iure libero magni non officiis, reiciendis ut. Alias aliquam amet, atque cupiditate delectus dicta doloremque earum incidunt inventore ipsum molestiae nam nobis numquam porro sapiente tenetur vel, voluptatum. Doloremque exercitationem incidunt non provident vero? Ad aliquam cumque, cupiditate eveniet numquam optio recusandae."},
          {author:"Marko Markovic", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nihil porro veritatis? Accusantium iste quisquam ratione tenetur vero? Ab amet aut consectetur, deleniti earum eos in ipsam libero, necessitatibus nesciunt officia porro quisquam, ratione sequi similique sit suscipit temporibus unde. Aspernatur commodi consequuntur doloribus excepturi facere fugit hic nulla possimus tempore veniam. Aliquam animi ipsam labore quia quibusdam rem vero! Assumenda libero nulla obcaecati quaerat quisquam tempore ullam. Ab at consequuntur culpa cumque exercitationem harum, hic, illo impedit ipsa laboriosam maiores omnis quaerat ratione, rem repellendus reprehenderit sit temporibus. Deserunt eius eum fuga illum porro quos repellendus sit suscipit unde."},
          {author:"Milos Ljubisavljevic", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi eum eveniet fuga inventore sapiente sunt. Alias aliquid asperiores autem beatae cupiditate distinctio doloremque ea et id illum in, ipsa iste iusto magnam nesciunt non odit optio pariatur placeat, porro quasi quia quo reiciendis, reprehenderit sint soluta sunt. Ex in, molestiae!"},
          {author:"Mika Peric", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut doloribus eligendi iure magni maxime mollitia nisi. Earum excepturi iusto nostrum reiciendis saepe tempora vitae voluptates. Debitis, dicta, vitae! Aperiam cumque eos esse nisi, obcaecati quisquam! Aliquam aperiam architecto dignissimos eligendi facilis, iure laborum magni neque nihil porro repellendus repudiandae soluta, ut. Ab aspernatur assumenda atque consequatur consequuntur corporis cum earum eos error esse ex expedita fugiat hic ipsam ipsum iure magnam maxime mollitia nemo nesciunt obcaecati odio officia quas quasi quidem quo quod reiciendis repellat sapiente sequi sint, vero voluptate voluptatum. Animi aspernatur autem cumque debitis, dignissimos eius esse eveniet maiores, minima minus possimus quibusdam ratione suscipit, ut vitae! Alias asperiores consectetur facilis natus perspiciatis quas sit voluptatibus? Animi architecto aut, consequatur corporis deserunt fuga itaque iusto libero, maxime, necessitatibus non possimus repellendus rerum totam voluptatibus! Alias aliquid blanditiis consectetur consequuntur delectus ea incidunt quam reprehenderit repudiandae vel! A accusamus corporis culpa cupiditate delectus deserunt distinctio incidunt iure libero magni non officiis, reiciendis ut. Alias aliquam amet, atque cupiditate delectus dicta doloremque earum incidunt inventore ipsum molestiae nam nobis numquam porro sapiente tenetur vel, voluptatum. Doloremque exercitationem incidunt non provident vero? Ad aliquam cumque, cupiditate eveniet numquam optio recusandae."},
          {author:"Ivan Vulovic", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga laudantium neque odio soluta. A ab, aliquam asperiores assumenda doloribus dolorum ducimus eligendi enim et eveniet expedita facilis laudantium magni molestias numquam obcaecati odit possimus quasi quisquam repellendus, sed tempora velit. Atque corporis, illum itaque iusto labore laborum necessitatibus perspiciatis quam?"}
        ],
        files:[
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", fileName:'some_useful_file.pdf',description:"This is some dumb description"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", fileName:'stuff_is_good.pdf',description:"For some other stuff"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", fileName:'colors.pdf',description:"Colors here"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", fileName:'some_useful_read_file.pdf',description:"Read about this"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", fileName:'range_pickers.pdf',description:"Range pickers pdf"}
        ],
        links: [
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
        ]
      }
    };
  }

  changeTab (event, value) {
    this.setState({...this.state, activeTab: value });
  };

  updateTaskStatus(id){
    this.setState({
      ...this.state,
      project:{
        ...this.state.project,
        tasks: this.state.project.tasks.map(task => task.id === id ? {...task, status: !task.status} : task)
      }
    });
  }

  createTask(task){
    this.setState({
      ...this.state,
      project:{
        ...this.state.project,
        tasks:[
          ...this.state.project.tasks,
          {id: Math.floor(Math.random()*10000), status: false, description:task}
        ]
      }
    });
  }

  updateTaskDescription(id, description){
    this.setState({
      ...this.state,
      project:{
        ...this.state.project,
        tasks: this.state.project.tasks.map(task => task.id === id ? {...task, description: description} : task)
      }
    });
  }

  removeTask(id){
    if(id){
      this.setState({
        ...this.state,
        project:{
          ...this.state.project,
          tasks: this.state.project.tasks.filter(task => task.id !==id)
        }
      });
    }
  }


  render(){
    const activeTasks = this.state.project.tasks.filter(task => !task.status);
    const completedTasks = this.state.project.tasks.filter(task => task.status);
    return(
      <div className="overflow-auto">
        <AppBar position="static" color="default" className="margin-top ">
          <Toolbar>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <p className="project-title color-gray"> {this.state.project.project} </p>
            </div>
          </Toolbar>

          <Toolbar>
            <div>
              <p className="small-line-spacing color-gray bottom-space">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque distinctio dolor dolore eaque facilis, itaque iure iusto nemo porro provident quis quod repudiandae sapiente tempora vel voluptas! Ad architecto atque blanditiis consequatur cumque dolores dolorum error eveniet facilis, fuga hic ipsum neque nihil reiciendis sed soluta suscipit vel voluptas.
              </p>
            </div>
          </Toolbar>
        </AppBar>

        <AppBar position="static" color="default">
          <Tabs value={this.state.activeTab} onChange={this.changeTab} scrollButtons="on" variant="fullWidth" indicatorColor="primary" textColor="primary">
            <Tab label="Tasks" icon={<GoTasklist size={20}/>} />
            <Tab label="Notes" icon={<GoNote size={20}/>} />
            <Tab label="Files" icon={<FaRegFile size={20}/>} />
            <Tab label="Links" icon={<GoLinkExternal size={22}/>} />
          </Tabs>
        </AppBar>

        {this.state.activeTab === 0 && (
          <TabContainer>
            <CreateTask onTaskCreation={this.createTask}/>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <TaskList tasks={activeTasks} onDescriptionUpdate={this.updateTaskDescription} onTaskRemoval={this.removeTask} onTaskStatusUpdate={this.updateTaskStatus}/>
              {!Boolean(activeTasks.length) && <p className="text-muted">We couldn't find any task.</p>}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <TaskList tasks={completedTasks} onDescriptionUpdate={this.updateTaskDescription} onTaskRemoval={this.removeTask} onTaskStatusUpdate={this.updateTaskStatus}/>
              {!Boolean(completedTasks.length) && <p className="text-muted">No completed tasks found.</p>}
            </div>
        </TabContainer>)}

        {this.state.activeTab === 1 && (
          <TabContainer>
            <ul className="project-items-list">
              {this.state.project.notes.map((project, i) => <ProjecNoteItem key={i} description={project.description} author={project.author} /> )}
            </ul>
        </TabContainer>)}

        {this.state.activeTab === 2 && (
          <TabContainer>
            <ul className="project-items-list">
              {this.state.project.files.map((project, i) => <ProjectFileItem key={i} description={project.description} link={project.link } fileName={project.fileName} /> )}
            </ul>
        </TabContainer>)}

        {this.state.activeTab === 3 && (
          <TabContainer>
            <ul className="project-items-list">
              {this.state.project.links.map((project, i) => <ProjectLinkItem key={i} description={project.description} link={project.link } /> )}
            </ul>
        </TabContainer>)}
      </div>
    )
  }
}

