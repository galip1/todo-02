import React, { useState, useRef, useEffect } from "react";
import Form from "./components/form";
import FilterButton from "./components/filter-button";
import Todo from "./components/to-do";
import { nanoid } from "nanoid";

//nanoid:Nanoid güvenli ve hızlı bir şekilde benzersiz ID değerleri üretmek için geliştirilmiş ücretsiz bir kütüphanedir.
//Donanım tabanlı (hardware random bytes generation) bir ID oluşturmayı destekler.
// Bu daha güçlü ve benzersiz ID oluşturmayı sağlar.

//usePrevious adlı bir custom hook tanımlanıyor.
//Bu hook, bir değerin önceki değerini tutmak için useRef ve useEffect kullanır.
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
//FILTER_MAP adlı bir obje, filtreleme işlevlerini tutmak için tanımlanır.
//Bu obje, "All", "Active" ve "Completed" olmak üzere üç anahtar içerir.
//Her anahtar, ilgili filtre işlevine sahip bir fonksiyona sahiptir.
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

//FILTER_NAMES adlı bir dizi, FILTER_MAP'teki anahtarların listesini içerir.
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
  //tasks ve filter. tasks, uygulamadaki tüm görevleri ve filter,
  // görevlerin görüntüleneceği filtreyi tutar.
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  //toggleTaskCompleted, deleteTask ve editTask adlı üç işlev, görevlerin düzenlenmesi için kullanılır.
  //toggleTaskCompleted, bir görevin tamamlanma durumunu değiştirir;
  // deleteTask, bir görevi siler; ve editTask, bir görevin adını değiştirir.
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };
  //taskList adlı bir dizi, görevleri filtreye göre filtreler
  // ve Todo bileşenini her görev için oluşturur.
  //Bu Todo bileşenleri, görev adı, tamamlanma durumu, tamamlanma işlevleri,
  //silme işlevleri ve düzenleme işlevleri gibi özellikler içerir.
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  //filterList adlı bir dizi, FilterButton bileşenlerini her filtre için oluşturur.
  // Bu bileşenler, her filtre için bir buton içerir ve butonlardan sadece biri seçili olabilir.
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //addTask adlı bir işlev, yeni bir görev ekler ve
  // bunu bir nanoid kullanarak benzersiz bir ID ile birlikte yapar.
  const addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  };

  // gösterilen görev sayısını göstermek için bir başlık ve bir "listHeadingRef" adlı bir "ref" tanımlanır.
  //"useEffect" kullanarak, görev sayısı değiştirildiğinde "ref" odaklanır
  //ve "usePrevious" kancası, önceki görev sayısını saklar.
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
};

export default App;
