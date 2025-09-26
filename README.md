# Kids Storytelling Bot Backend

A production-ready FastAPI backend for generating safe, engaging stories for children using multiple LLM providers.

## Features

- **Multiple LLM Support**: OpenAI, Hugging Face, and OpenAI-compatible endpoints
- **Session-Based Memory**: Maintains conversation context during storytelling sessions
- **Content Safety Filters**: Configurable filters for moral values, educational content, or pure fun
- **Age-Appropriate Content**: Tailored storytelling for different age groups (3-5, 6-8, 9-12)
- **RESTful API**: Clean, well-documented API endpoints with Pydantic validation
- **Flexible Storage**: In-memory or Redis-based session management
- **Production Ready**: Structured logging, error handling, and health checks

## Quick Start

1. **Clone and Install**
   ```bash
   cd Kids_story
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your API keys and settings
   ```

3. **Run the Server**
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Test the API**
   ```bash
   # Start a new story
   curl -X POST http://localhost:8000/story/start \
     -H "Content-Type: application/json" \
     -d '{"prompt": "A brave little rabbit who wants to learn how to fly"}'
   ```

## API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **API Examples**: See [API_EXAMPLES.md](API_EXAMPLES.md) for detailed usage examples

## Project Structure

```
Kids_story/
├── app/
│   ├── core/           # Core functionality (LLM, sessions, safety)
│   ├── models/         # Pydantic models
│   ├── routers/        # API endpoints
│   ├── services/       # Business logic
│   └── utils/          # Utilities and helpers
├── tests/              # Test files
├── requirements.txt    # Python dependencies
├── env.example         # Environment variables template
└── API_EXAMPLES.md     # API usage examples
```

## Configuration

Key environment variables (see `env.example` for full list):

- `LLM_PROVIDER`: Choose between "openai", "huggingface", or "openai_compatible"
- `SESSION_BACKEND`: Use "memory" for development or "redis" for production
- `SAFETY_FILTERS_ENABLED`: Enable/disable content filtering
- `DEFAULT_CONTENT_FILTER`: Set default filter ("moral_values", "educational", "fun_only")

## Content Filters

The system includes three configurable content filters:

1. **Moral Values**: Promotes kindness, sharing, and positive behavior
2. **Educational**: Includes learning elements and educational content
3. **Fun Only**: Pure entertainment with silly, exciting adventures

## Development

```bash
# Run with auto-reload
uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black app/

# Lint code
flake8 app/
```

## License

This project is provided as-is for educational and development purposes.
