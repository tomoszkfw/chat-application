const messageInput = document.getElementById("message-input");
const reactionIdInput = document.getElementById("reactionIdSelect");
const selectReaction = document.getElementById("reaction");

setInterval(() => {
    if (
        !messageInput.value &&
        !reactionIdInput.value &&
        !selectReaction.reaction.value
    ) {
        window.location.reload();
    }
}, 5 * 1000);
