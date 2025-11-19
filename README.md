# NeoView

A full-stack application for querying and visualizing graph data using SPARQL. NeoView provides an intuitive interface for exploring knowledge graphs from multiple data sources including Wikidata, local RDF files, and external SPARQL endpoints.

## Features

### 🔍 **Query Capabilities**

- **SPARQL Query Editor**: Write and execute SPARQL queries with ease
- **Multiple Data Sources**: Query Wikidata, import `.ttl` files, or connect to external SPARQL endpoints
- **Query Persistence**: Save and reuse your favorite queries

### 📊 **Visualization**

- **Interactive Graph Visualization**: Explore query results as interactive network graphs
- **Tabular View**: View results in a clean, sortable table format
- **Dual Display Modes**: Switch between graph and table views seamlessly

### 💾 **Data Management**

- **Local RDF Support**: Upload and query `.ttl` (Turtle) files
- **External Endpoints**: Configure custom SPARQL endpoints
- **SQLite Persistence**: All queries are automatically saved to a local database

## Architecture

NeoView is built with a modern, decoupled architecture:

- **Frontend**: Angular application with Angular Material UI components
- **Backend**: Python FastAPI server acting as a SPARQL proxy with persistence layer
- **Database**: SQLite for query storage
- **RDF Processing**: RDFLib for local graph data handling

```md
graphview/
├── frontend/          # Angular application
│   ├── src/
│   │   └── app/      # Angular components and services
│   └── README.md     # Frontend-specific documentation
└── backend/          # FastAPI application
    ├── main.py       # API routes and SPARQL proxy
    ├── models.py     # Database models
    ├── database.py   # Database configuration
    └── README.md     # Backend-specific documentation
```

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher) and npm
- **Python** 3.8 or higher
- **Git**

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd neoview
   ```

2. **Set up the backend**:

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (from the `backend` directory):

   ```bash
   source venv/bin/activate  # If not already activated
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`

   API documentation: `http://localhost:8000/docs`

2. **Start the frontend** (from the `frontend` directory, in a new terminal):

   ```bash
   ng serve
   ```

   Navigate to `http://localhost:4200` in your browser

## Usage

1. **Execute SPARQL Queries**: Use the query editor to write SPARQL queries against Wikidata or other endpoints
2. **Upload Local Data**: Import `.ttl` files to query your own RDF data locally
3. **Visualize Results**: Toggle between graph and table views to explore query results
4. **Save Queries**: Store frequently used queries for quick access

## API Endpoints

- `POST /query` - Execute a SPARQL query
- `POST /upload` - Upload and parse a `.ttl` file
- `POST /queries/` - Save a query
- `GET /queries/` - Retrieve saved queries

See the [backend README](backend/README.md) for detailed API documentation.

## Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Tech Stack

### Frontend

- Angular 20
- Angular Material
- TypeScript
- vis-network (for graph visualization)

### Backend

- FastAPI
- SQLAlchemy
- RDFLib
- httpx
- SQLite

## Development

For detailed development information:

- Frontend development: See [frontend/README.md](frontend/README.md)
- Backend development: See [backend/README.md](backend/README.md)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
