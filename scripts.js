// Add your JavaScript functions for user interaction
function getUserInput(event) {
    if (event.key === "Enter") {
        var userInput = $("#user-input").val();
        $("#chat-container").append("<p class='user-message'>" + userInput + "</p>");
        $("#user-input").val("");
        simulateTyping();
        getBotResponse(userInput);
    }
}

function simulateTyping() {
    $("#chat-container").append("<p class='bot-message'>Typing...</p>");
    var chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getBotResponse(userInput) {
    $.ajax({
        url: "/get",
        data: { msg: userInput },
        type: "GET",
        success: function (data) {
            displayBotResponse(data);
        },
    });
}

function displayBotResponse(data) {
    setTimeout(function () {
        $("#chat-container").find(".bot-message:contains('Typing...')").remove();
        var response = data["response"][0]["content"];
        $("#chat-container").append("<p class='bot-message'>" + response + "</p>");
        var chatContainer = document.getElementById("chat-container");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}
