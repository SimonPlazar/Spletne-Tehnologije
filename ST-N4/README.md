# Vaja 4 - Spletni priporočilni sistemi

V okviru dane vaje izdelajte priporočilni sistem za priporočanje spletnih vsebin. Za realizacijo vaje lahko uporabite poljubne tehnologije.

Najprej izberite poljubno javno dostopno zbirko spletnih vsebin (npr. MovieLens 100K, Book Crossing ).

Nato implementirate dva klasična algoritma za priporočanje vsebin (npr. SVD, K-NN, SlopeOne). Oba algoritma implementirate brez uporabe knjižnic. (6%)

Izvedite oba algoritma nad izbrano zbirko, kjer naključno izberete 5 uporabnikov za katere izvedete priporočanje. Za vsako priporočanje (2 algoritma * 5 priporočanja) izpišete 5 najbolj priporočenih vsebin (ki še jih ni ocenil) in njihove ocene. 


•Preučite, kako različni parametri, kot so število sosedov v K-NN algoritmu ali število latentnih dejavnikov v SVD, vplivajo na uspešnost priporočil. Za vsak algoritem izvedite vsaj 3 eksperimente z različnimi nastavitvami parametrov in analizirajte rezultate. Pri Slope-One preučite vpliv števila ocen pri izračunu povprečij.
•Preučite, kako se algoritmi obnašajo v scenariju hladnega zagona, kjer je novim uporabnikom ali vsebinam težko priporočiti zaradi pomanjkanja preteklih interakcij.

Vse skupaj podate v poročilu (1 stran). (7%)
 

Literatura v pomoč:


https://www.kaggle.com/datasets/prajitdatta/movielens-100k-dataset
https://www.kaggle.com/datasets/grouplens/movielens-20m-dataset
https://www.kaggle.com/datasets/ruchi798/bookcrossing-dataset