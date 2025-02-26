import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import numpy as np

import networkx as nx
import matplotlib.pyplot as plt
import matplotlib

matplotlib.use('TkAgg')  # Nastavite backend na TkAgg


def parse_robots_txt(base_url):
    robots_url = urljoin(base_url, "/robots.txt")
    disallowed_paths = set()
    try:
        response = requests.get(robots_url, timeout=5)
        if response.status_code == 200:
            lines = response.text.splitlines()
            for line in lines:
                line = line.strip()
                if line.startswith("Disallow:"):
                    disallowed_path = line.split(":", 1)[1].strip()
                    if disallowed_path:
                        disallowed_paths.add(disallowed_path)
    except requests.RequestException:
        pass
    return disallowed_paths


def is_allowed_to_crawl(disallowed_paths, path):
    for disallowed_path in disallowed_paths:
        if path.startswith(disallowed_path):
            return False
    return True


def crawl(start_url, max_depth):
    visited = set()
    robots_cache = {}
    adjacency_list = {}

    def get_disallowed_paths(domain):
        if domain not in robots_cache:
            robots_cache[domain] = parse_robots_txt(f"{domain}")
        return robots_cache[domain]

    def crawl_recursive(url, depth):
        if depth > max_depth or url in visited:
            return
        visited.add(url)
        print(f"Visiting: {url} (depth: {depth})")

        parsed_url = urlparse(url)
        domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
        disallowed_paths = get_disallowed_paths(domain)

        if not is_allowed_to_crawl(disallowed_paths, parsed_url.path):
            print(f"Blocked by robots.txt: {url}")
            return
        try:
            response = requests.get(url, timeout=5)
            if response.status_code != 200:
                return

            try:
                soup = BeautifulSoup(response.text, 'html.parser')
            except Exception as e:
                print(f"Error parsing {url}: {e}")
                return

            links = set()

            for tag in soup.find_all('a', href=True):
                href = tag["href"].strip()
                joined_url = urljoin(url, href)
                parsed_joined = urlparse(joined_url)

                if is_allowed_to_crawl(disallowed_paths, parsed_joined.path) and not parsed_joined.path.endswith(('.pdf', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.mp3')):
                    links.add(joined_url)

            adjacency_list[url] = list(links)

            for link in links:
                crawl_recursive(link, depth + 1)

        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")

    crawl_recursive(start_url, 0)
    print("Robot cache:")
    print(robots_cache)
    return adjacency_list


def build_adjacency_matrix(adjacency_list):
    nodes = list(adjacency_list.keys())
    index_map = {node: idx for idx, node in enumerate(nodes)}
    size = len(nodes)
    M = np.zeros((size, size))

    for node, links in adjacency_list.items():
        if links:
            idx = index_map[node]
            for link in links:
                if link in index_map:
                    M[index_map[link], idx] += 1

    for j in range(size):
        if M[:, j].sum() > 0:
            M[:, j] /= M[:, j].sum()

    return M, nodes


def calculate_pagerank(M, beta=0.85, epsilon=1e-6):
    num_nodes = M.shape[0]

    A = beta * M
    r = np.ones(num_nodes) / num_nodes

    change = float('inf')
    while change > epsilon:
        r_new = A @ r + (1 - beta)
        change = np.linalg.norm(r_new - r, 1)
        r = r_new

    return r


if __name__ == "__main__":
    start_url = input("Enter the starting URL (e.g., https://example.com): ").strip()
    max_depth = int(input("Enter the maximum crawl depth: "))

    print("Crawling the web...")
    adjacency_list = crawl(start_url, max_depth)
    print("Adjacency list:")
    print(adjacency_list)

    print("Building adjacency matrix...")
    M, nodes = build_adjacency_matrix(adjacency_list)

    print("Calculating PageRank...")
    pagerank_scores = calculate_pagerank(M)

    ranked_pages = sorted([(node, rank) for node, rank in zip(nodes, pagerank_scores)], key=lambda x: x[1],
                          reverse=True)

    print("Top 5 pages by PageRank:")
    for node, rank in ranked_pages[:5]:
        print(f"{node}: {rank}")

    top_pages = ranked_pages[:7]
    top_pages_nodes = [node for node, rank in top_pages]

    G = nx.DiGraph()

    for node, neighbors in adjacency_list.items():
        if node in top_pages_nodes:
            for neighbor in neighbors[:3]:
                # if neighbor in top_pages_nodes:
                G.add_edge(node, neighbor)

    # Nastavite velikost vozlišč glede na PageRank vrednost
    node_sizes = {node: rank * 200 for node, rank in top_pages}

    # Prikaz grafa
    plt.figure(figsize=(10, 8))

    # Risanje grafa s prilagojenimi velikostmi vozlišč
    pos = nx.spring_layout(G)  # Razporeditev vozlišč
    nx.draw_networkx_nodes(G, pos, node_size=[node_sizes.get(node, 300) for node in G.nodes()])
    nx.draw_networkx_edges(G, pos, alpha=0.5)
    nx.draw_networkx_labels(G, pos)

    plt.title("Graf Top 5 spletnih strani in strani, ki kažejo nanje")
    plt.savefig('graph.png')
