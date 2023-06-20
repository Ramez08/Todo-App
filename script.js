window.addEventListener("load", () => {
    // Executes when the page finishes loading

    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Prevents the form from being submitted and the page from refreshing

        const task = input.value;
        // Retrieves the value entered in the input field

        if (!task) {
            alert("Please fill out a task");
            return;
        }
        // Checks if the task is empty and displays an alert if it is

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        // Creates a new div element and assigns the 'task' class to it

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        // Creates a new div element and assigns the 'content' class to it

        task_el.appendChild(task_content_el);
        // Appends the content div to the task div

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");
        // Creates a new input element, sets its type, value, and makes it read-only

        task_content_el.appendChild(task_input_el);
        // Appends the input element to the content div

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        // Creates a new div element and assigns the 'actions' class to it

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";
        // Creates a new button element, assigns the 'edit' class to it, and sets its inner HTML

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";
        // Creates a new button element, assigns the 'delete' class to it, and sets its inner HTML

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        // Appends the edit and delete buttons to the actions div

        task_el.appendChild(task_actions_el);
        // Appends the actions div to the task div

        list_el.appendChild(task_el);
        // Appends the task div to the list element

        input.value = "";
        // Resets the input field value to an empty string

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLocaleLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
            // Toggles between edit and save modes when the edit button is clicked
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            // Removes the task element when the delete button is clicked
        });
    });
});
