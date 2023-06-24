window.addEventListener("load", () => {
    // Event listener for when the window has finished loading
  
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const saveTasks = () => {
      // Function to save the tasks to the local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const createTaskElement = (task) => {
      // Function to create a new task element
  
      const task_el = document.createElement("div");
      task_el.classList.add("task");
  
      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
  
      task_el.appendChild(task_content_el);
  
      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = task;
      task_input_el.setAttribute("readonly", "readonly");
  
      task_content_el.appendChild(task_input_el);
  
      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");
  
      const task_complete_el = document.createElement("button");
      task_complete_el.classList.add("complete");
      task_complete_el.innerHTML = "Complete";
  
      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = "Edit";
  
      const task_important_el = document.createElement("button");
      task_important_el.classList.add("important");
      task_important_el.innerHTML = "☆";
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";
  
      task_actions_el.appendChild(task_complete_el);
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_important_el);
      task_actions_el.appendChild(task_delete_el);
  
      task_el.appendChild(task_actions_el);
  
      list_el.appendChild(task_el);
  
      task_complete_el.addEventListener("click", () => {
        // Event listener for the task completion button
        list_el.removeChild(task_el);
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
      });
  
      task_edit_el.addEventListener("click", () => {
        // Event listener for the task edit button
        if (task_edit_el.innerText.toLowerCase() === "edit") {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerText = "Save";
        } else {
          const updatedTask = task_input_el.value;
          task_input_el.setAttribute("readonly", "readonly");
          task_edit_el.innerText = "Edit";
          if (updatedTask !== task) {
            tasks = tasks.map((t) => (t === task ? updatedTask : t));
            saveTasks();
          }
        }
      });
  
      task_important_el.addEventListener("click", () => {
        // Event listener for the task importance button
        task_important_el.classList.toggle("active");
  
        if (task_important_el.classList.contains("active")) {
          task_important_el.innerHTML = "⭐";
          task_important_el.style.color = "yellow";
        } else {
          task_important_el.innerHTML = "☆";
          task_important_el.style.color = "white";
        }
      });
  
      task_delete_el.addEventListener("click", () => {
        // Event listener for the task deletion button
        list_el.removeChild(task_el);
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
      });
    };
  
    tasks.forEach((task) => {
      // Loop through existing tasks and create task elements for each
      createTaskElement(task);
    });
  
    form.addEventListener("submit", (e) => {
      // Event listener for the form submission
      e.preventDefault();
  
      const task = input.value;
  
      if (!task) {
        alert("Please fill out a task");
        return;
      }
  
      createTaskElement(task);
      tasks.push(task);
      saveTasks();
  
      input.value = "";
    });
  });
  