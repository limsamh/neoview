# NeoView Backend

FastAPI application for NeoView, providing a SPARQL proxy to Wikidata, local file support, and persistence for saved queries.

## Setup

1.  Create a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running

Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
API Documentation is available at `http://localhost:8000/docs`.

## Features

-   **SPARQL Proxy**: `/query` endpoint proxies requests to Wikidata.
-   **Persistence**: Saves queries to a local SQLite database (`sql_app.db`).
