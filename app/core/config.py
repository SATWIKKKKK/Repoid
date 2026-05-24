from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Autonomous AI Workflow Builder"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost/automata"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str = "super_secret_key_change_me_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    FERNET_KEY: str = "kU2xV1oR4DqF8zZ0cM7nL3wP5yB9sJ6tH2aK1gV8bI=" # Must be 32 url-safe base64
    
    # LLM APIs
    DEEPSEEK_API_KEY: str = ""
    AICREDITS_API_KEY: str = ""  # Legacy env name; now expected to contain the DeepSeek key.
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    DEEPSEEK_MODEL: str = "deepseek-chat"
    
    # Temporal
    TEMPORAL_HOST: str = "localhost:7233"
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
