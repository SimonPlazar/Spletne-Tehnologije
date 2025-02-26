import kagglehub
import numpy as np
import pandas as pd


def svd_sgd(R, k, alpha=0.01, lambda_=0.1, num_iterations=20):
    num_users, num_items = R.shape
    U = np.random.normal(scale=1. / k, size=(num_users, k))
    V = np.random.normal(scale=1. / k, size=(num_items, k))

    for iteration in range(num_iterations):
        for u in range(num_users):
            for i in range(num_items):
                if R[u, i] > 0:  # Če je ocena podana
                    error_ui = R[u, i] - np.dot(U[u, :], V[i, :].T)
                    for f in range(k):
                        U[u, f] += alpha * (2 * error_ui * V[i, f] - lambda_ * U[u, f])
                        V[i, f] += alpha * (2 * error_ui * U[u, f] - lambda_ * V[i, f])
    return U, V


def podobnost(user1, user2):
    dot_product = np.dot(user1, user2)
    norm_user1 = np.linalg.norm(user1)
    norm_user2 = np.linalg.norm(user2)
    if norm_user1 == 0 or norm_user2 == 0:
        return 0
    return dot_product / (norm_user1 * norm_user2)


def calculate_predicted_ratings(R, target_user, k):
    num_users, num_items = R.shape
    similarities = []

    # Izračunaj podobnosti med ciljnim uporabnikom in ostalimi
    for other_user in range(num_users):
        if other_user != target_user:
            sim = podobnost(R[target_user], R[other_user])
            similarities.append((other_user, sim))

    # Uredi uporabnike po podobnosti
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)[:k]

    # Napoved ocen za vse filme
    predicted_ratings = np.zeros(num_items)
    for item in range(num_items):
        if R[target_user, item] == 0:  # Samo za neocenjene filme
            numerator = 0
            denominator = 0
            for neighbor, similarity in similarities:
                numerator += similarity * R[neighbor, item]
                denominator += abs(similarity)
            if denominator > 0:
                predicted_ratings[item] = numerator / denominator

    return predicted_ratings


if __name__ == '__main__':
    # Branje podatkovne zbirke
    path = kagglehub.dataset_download("prajitdatta/movielens-100k-dataset") + "/ml-100k/u.data"
    print("Path to dataset files:", path)

    column_names = ['user_id', 'movie_id', 'rating', 'timestamp']
    data = pd.read_csv(path, sep='\t', names=column_names)

    # Pretvorba podatkov v matriko uporabnik-film
    num_users = data['user_id'].max()
    num_movies = data['movie_id'].max()
    ratings_matrix = np.zeros((num_users, num_movies))

    for row in data.itertuples():
        ratings_matrix[row.user_id - 1, row.movie_id - 1] = row.rating

    random_users = np.random.choice(range(num_users), size=5, replace=False)

    # user_rating_counts = np.sum(ratings_matrix > 0, axis=1)
    # users_with_few_ratings = np.where((user_rating_counts <= 20))[0]
    # random_users = np.random.choice(users_with_few_ratings, size=5, replace=False)

    k = 10  # dimenzija latentnega prostora
    U, V = svd_sgd(ratings_matrix, k)
    predicted_ratings = np.dot(U, V.T)  # napovedovanje ocen

    k = 3  # stevilo sosedov

    num_recommendations = 5

    for user_id in random_users:
        known_ratings = ratings_matrix[user_id] > 0

        user_ratings_svd = predicted_ratings[user_id]
        recommendations = np.argsort(user_ratings_svd)[::-1]
        recommendations = [movie_id for movie_id in recommendations if not known_ratings[movie_id]]
        top_recommendations_svd = recommendations[:num_recommendations]

        user_ratings_knn = calculate_predicted_ratings(ratings_matrix, user_id, k)
        recommendations = np.argsort(user_ratings_knn)[::-1]
        recommendations = [movie_id for movie_id in recommendations if not known_ratings[movie_id]]
        top_recommendations_knn = recommendations[:num_recommendations]

        print(f"Priporočila za uporabnika {user_id + 1}:")
        print("SVD:")
        for movie_id in top_recommendations_svd:
            print(f"Film ID: {movie_id + 1}, Ocena: {user_ratings_svd[movie_id]:.2f}")
        print("KNN: " + str(k))
        for movie_id in top_recommendations_knn:
            print(f"Film ID: {movie_id + 1}, Ocena: {user_ratings_knn[movie_id]:.2f}")
