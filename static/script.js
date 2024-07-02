const messageInput = document.getElementById("message-input");
const reactionId = document.getElementById("reactionId-input");
const good = document.getElementById("good");
const favorite = document.getElementById("favorite");
const bad = document.getElementById("bad");

const noMessage = messageInput.value === "";
const noId = reactionId.value === "";
const noSelection = !good.checked && !favorite.checked && !bad.checked;

setInterval(() => {
    if (noMessage && noId && noSelection) {
        window.location.reload();
    }
}, 5 * 1000);
