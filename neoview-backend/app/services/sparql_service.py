# SPARQL execution logic
from SPARQLWrapper import SPARQLWrapper, JSON
from app.core.settings import settings
from app.services.graph_parser import parse_rdf_results

class SparqlService:

    def run_sparql_query(query: str, endpoint: str | None = None):
        sparql = SPARQLWrapper(endpoint or settings.sparql_endpoint)
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)

        # Optional auth
        if settings.sparql_user and settings.sparql_password:
            sparql.setCredentials(settings.sparql_user, settings.sparql_password)

        results = sparql.query().convert()
        graph_json = parse_rdf_results(results)
        return graph_json
