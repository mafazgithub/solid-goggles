from flask import Flask, render_template, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
import datetime
import random

app = Flask(__name__)

# Create and train the chatbot
chatbot = ChatBot('FuturisticBot')
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.english')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    user_text = request.args.get('msg')
    bot_response = str(chatbot.get_response(user_text))

    # Simulate typing indicator
    typing_duration = len(bot_response) * 0.05  # 50ms per character
    typing_indicator = [{"role": "bot", "content": "Typing...", "timestamp": str(datetime.datetime.now())}]
    
    # Simulate bot response after typing
    bot_response_data = [{"role": "bot", "content": bot_response, "timestamp": str(datetime.datetime.now())}]

    return jsonify({"typing": typing_indicator, "response": bot_response_data})

if __name__ == "__main__":
    app.run(debug=True)
