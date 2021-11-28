import Axios from "axios";
import React, { Component } from "react";

class TestAltran extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      todoList: [],
      doneList: [],
      isDone: 0,
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleFinishTodo = this.handleFinishTodo.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/api/get").then((httpResponse) => {
      const todoList = httpResponse.data.filter((task) => task.isDone === 0);
      const doneList = httpResponse.data.filter((task) => task.isDone === 1);

      this.setState({
        todoList,
        doneList,
      });
    });
  }

  handleChangeInput(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodo() {
    let { todoList, title, description } = this.state;

    Axios.post("http://localhost:3001/api/insert", {
      title,
      description,
    }).then((httpResponse) => {
      this.setState({
        todoList: httpResponse.data,
      });
    });

    this.setState({
      title: "",
      description: "",
      todoList,
    });
  }

  handleFinishTodo(index) {
    // Axios.patch("http://localhost:3001/api/update"),
    //   {
    //
    //   };
  }

  render() {
    const { todoList, doneList, title, description } = this.state;

    return (
      <section id="screen">
        <div id="allContainer">
          <div className="title">
            <h1>Ma liste de tâches</h1>
          </div>
          <div className="UpdateTodo">
            <form className="displayForm">
              <div className="containerChamp">
                <div>
                  <label>Titre : </label>
                  <input
                    value={title}
                    className="inputTitle"
                    type="text"
                    placeholder="titre de la tâche"
                    name="title"
                    onChange={this.handleChangeInput}
                  />
                </div>
                <div>
                  <label>Description : </label>
                  <input
                    value={description}
                    className="inputDescription"
                    type="text"
                    placeholder="description de la tâche"
                    name="description"
                    onChange={this.handleChangeInput}
                  />
                </div>
              </div>
              <div className="displayButtonAdd">
                <button
                  className="buttonAdd"
                  onClick={this.addTodo}
                  disabled={title === ""}
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
          <div className="TaskTodo">
            <h2 className="titleTodo">Mes tâches à réaliser</h2>
            {todoList.map((item) => (
              <div className="todoItem">
                <div className="titleItemTodo">
                  <p>{item.title}</p>
                </div>
                <div className="descriptionItemTodo">
                  <p>{item.description}</p>
                </div>
                <div className="divButtonFinish">
                  <button
                    className="buttonFinish"
                    onClick={this.handleFinishTodo}
                  >
                    Terminer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="TaskDone">
            <h2 className="titleDone">Mes tâches réalisées</h2>
            {doneList.map((item) => (
              <div className="doneItem">
                <div className="titleItemDone">
                  <p>{item.title}</p>
                </div>
                <div className="descriptionItemDone">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default TestAltran;
