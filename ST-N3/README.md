# Vaja 3 - PageRank

V okviru dane vaje boste preučili izbran spletni graf ter uvrstili spletne strani glede na njihovo povezanost z uporabo algoritma PageRank. Za realizacijo vaje lahko uporabite poljubni programski jezik in tehnologije.

Najprej implementirajte preprost spletni pajek (angl. web crawler), ki se poveže na določeno spletno stran (vrhvno pot "/"), ter na vse ostale spletne strani (samo vrhovne poti "/"), ki so vsebovane v hiperpovezavah. Dani spletni pajek se tako pretaka po več spletnih straneh do določene globine, ki je uporabniško nastavljiva. Pri tem najprej preverite ali je dovoljeno obiskat stran s strani spletnega pajka preko datoteke robots.txt, kjer preverite, da se pot "/" ne nahaja v "Disallow: " oz. je v "Allow: ", oz. ni pravila. Za implementacijo pajka lahko uporabite knjižnice. (3%)

Nad obiskanimi spletnimi stranmi iz spletnega pajka zgradite usmerjeni spletni graf. Vozlišče v grafu je spletna stran, povezava med dvema vozliščama je hiperpovezava. Nad spletnim grafom izračunate metriko PageRank (s teleportiranjem) za vsa vozlišča. Za implementacijo algoritma PageRank ne uporabite knjižnic. Uporabite parameter Beta=0.85, izračun pa naj poteka do konvergence (zelo majhne spremembe v vrednostih). (3%)

Izdelajte poročilo (1-2 strani), kjer izrišete dva poljubna spletna grafa (lahko programersko ali ročno npr. z draw.io) ter izpišete prvih 5 spletnih strani po metriki PageRank (ter podajte izračune) za vsak spletni graf. Globina preiskovanja s pajkom naj bo minimalno 3 in maksimalno 6. Velikost vozlišč naj bo relativno proporcionalna ranking-u. (7%)

Oddajte naslednje v arhivu ZIP: programska koda za crawler in izračun PageRank-a, porocilo.pdf

Vrednost naloge: 13% od celotne ocene pri predmetu

Naknadni roki za oddajo: 2 tedna pred vsakim izpitnim rokom (datumi bodo objavljeni sproti na uvodni strani predmeta)

Oddana vaja bo ocenjena najkasneje v 2 tednih po roku za oddajo ali v 1 tednu pred izpitnim rokom. Ustnega zagovora pri dani vaji ni. V primeru nestrinjanja z dodeljeno oceno je možen ustni zagovor po predhodnem dogovoru.

Literatura:

robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
Python BeautifulSoup: https://www.scrapingbee.com/blog/crawling-python/
Python networkx: https://medium.com/@nelsonjoseph123/graph-visualization-using-python-bbd9a593c533
