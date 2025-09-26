"""
Configuration management for the Kids Storytelling Bot.
Loads settings from environment variables and provides type-safe access.
"""

from typing import Optional, Literal
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application Settings
    app_name: str = Field(default="Kids Storytelling Bot", env="APP_NAME")
    app_version: str = Field(default="1.0.0", env="APP_VERSION")
    debug: bool = Field(default=False, env="DEBUG")
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8000, env="PORT")
    
    # LLM Provider Configuration
    llm_provider: Literal["openai", "huggingface", "openai_compatible"] = Field(
        default="openai", 
        env="LLM_PROVIDER"
    )
    
    # OpenAI Configuration
    openai_api_key: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    openai_model: str = Field(default="gpt-3.5-turbo", env="OPENAI_MODEL")
    openai_max_tokens: int = Field(default=500, env="OPENAI_MAX_TOKENS")
    openai_temperature: float = Field(default=0.8, env="OPENAI_TEMPERATURE")
    
    # Hugging Face Configuration
    huggingface_api_key: Optional[str] = Field(default=None, env="HUGGINGFACE_API_KEY")
    huggingface_model: str = Field(default="microsoft/DialoGPT-medium", env="HUGGINGFACE_MODEL")
    
    # OpenAI-Compatible Configuration
    openai_compatible_base_url: str = Field(default="http://localhost:8001/v1", env="OPENAI_COMPATIBLE_BASE_URL")
    
    openai_compatible_model: str = Field(
        default="meta-llama/Llama-2-7b-chat-hf", 
        env="OPENAI_COMPATIBLE_MODEL"
    )
    openai_compatible_api_key: Optional[str] = Field(default=None, env="OPENAI_COMPATIBLE_API_KEY")
    
    # Session Management
    session_backend: Literal["memory", "redis"] = Field(default="memory", env="SESSION_BACKEND")
    session_timeout_minutes: int = Field(default=60, env="SESSION_TIMEOUT_MINUTES")
    
    # Redis Configuration
    redis_host: str = Field(default="localhost", env="REDIS_HOST")
    redis_port: int = Field(default=6379, env="REDIS_PORT")
    redis_db: int = Field(default=0, env="REDIS_DB")
    redis_password: Optional[str] = Field(default="", env="REDIS_PASSWORD")
    
    # Safety and Content Filtering
    safety_filters_enabled: bool = Field(default=True, env="SAFETY_FILTERS_ENABLED")
    default_content_filter: Literal["moral_values", "educational", "fun_only"] = Field(
        default="educational", 
        env="DEFAULT_CONTENT_FILTER"
    )
    max_story_length: int = Field(default=1000, env="MAX_STORY_LENGTH")
    
    # API Security
    api_key_enabled: bool = Field(default=False, env="API_KEY_ENABLED")
    api_key: Optional[str] = Field(default=None, env="API_KEY")
    
    # Logging
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_format: Literal["json", "plain"] = Field(default="json", env="LOG_FORMAT")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Create a singleton instance
settings = Settings()
