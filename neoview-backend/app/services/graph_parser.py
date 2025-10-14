# RDF → Graph JSON transformation
class GraphParser:

    def parse_rdf_results(results):
        """
        Transform SPARQL JSON results into {nodes, edges} for visualization.
        """
        nodes = {}
        edges = []

        for binding in results["results"]["bindings"]:
            s = binding.get("s", {}).get("value")
            p = binding.get("p", {}).get("value")
            o = binding.get("o", {}).get("value")

            if s and o:
                nodes[s] = {"id": s, "label": s.split("/")[-1]}
                nodes[o] = {"id": o, "label": o.split("/")[-1]}
                edges.append({"source": s, "target": o, "label": p.split("/")[-1]})

        return {"nodes": list(nodes.values()), "edges": edges}
