const socket = io("http://localhost:3333");
let user = null;
socket.on("update_messages", (messages) => {
  updateMessagesOnScreen(messages);
});

function updateMessagesOnScreen(messages) {
  console.log(1);

  const div_messages = document.querySelector("#messages");
  console.log(2);

  let list_messages = "";

  messages.forEach((message) => {
    list_messages += `<ul><li>${message.user}: ${message.msg}</li></ul>`;
  });

  console.log(list_messages);
  div_messages.innerHTML = list_messages;
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#messages_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user) {
      alert("Digite seu nome ");
      return;
    }
    const message = document.forms["messages_form"]["msg"].value;
    document.forms["messages_form"]["msg"].value = "";
    socket.emit("new_message", { user, msg: message });
    console.log(message);
  });
  const userForm = document.querySelector("#user_form");
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    user = document.forms["user_form"]["user"].value;
    userForm.parentNode.removeChild(userForm);
  });
});
