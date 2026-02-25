from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory storage for highscores (top 10 for each game)
snake_highscores = []
tetris_highscores = []

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({'error': 'All fields are required'}), 400

        # Log the contact message
        logger.info(f"New contact message from {name} ({email}): {message}")

        # Here you could save to a database, send an email, etc.
        # For now, just log it

        return jsonify({'message': 'Thank you for your message!'}), 200
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/highscore/<game>', methods=['GET'])
def get_highscores(game):
    try:
        if game == 'snake':
            highscores = sorted(snake_highscores, key=lambda x: x['score'], reverse=True)[:10]
        elif game == 'tetris':
            highscores = sorted(tetris_highscores, key=lambda x: x['score'], reverse=True)[:10]
        else:
            return jsonify({'error': 'Invalid game'}), 400

        return jsonify({'highscores': highscores}), 200
    except Exception as e:
        logger.error(f"Error retrieving highscores for {game}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/highscore/<game>', methods=['POST'])
def post_highscore(game):
    try:
        data = request.get_json()
        score = data.get('score')
        player = data.get('player', 'Anonymous')

        if score is None or not isinstance(score, int) or score < 0:
            return jsonify({'error': 'Invalid score'}), 400

        if game == 'snake':
            snake_highscores.append({'score': score, 'player': player})
        elif game == 'tetris':
            tetris_highscores.append({'score': score, 'player': player})
        else:
            return jsonify({'error': 'Invalid game'}), 400

        logger.info(f"New highscore for {game}: {score} by {player}")
        return jsonify({'message': 'Highscore submitted successfully'}), 201
    except Exception as e:
        logger.error(f"Error posting highscore for {game}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
