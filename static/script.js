const messageInput = document.getElementById("message-input");
const reactionIdInput = document.getElementById("reactionIdSelect");
const selectReaction = document.getElementById("reaction");

// メッセージがない時は送信ボタンを disabled にする
const submitPostBtn = document.getElementById("submitPost");
messageInput.onchange = () => {
    if (!messageInput.value) {
        submitPostBtn.disabled = true;
    } else {
        submitPostBtn.disabled = false;
    }
};

// 入力内容がないときは 5 秒おきにリロード
setInterval(() => {
    if (
        !messageInput.value &&
        !reactionIdInput.value &&
        !selectReaction.reaction.value
    ) {
        window.location.reload();
    }
}, 5 * 1000);
