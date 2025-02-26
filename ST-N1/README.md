# Vaja 1 - VDOM

V okviru dane vaje izdelajte JavaScript (JS) ogrodje za vodenje navideznega oz. virtualnega DOM (Virtual Document Object Model, VDOM), ki bo omogočal naslednje funkcionalnosti:

Ustvarjanje novih virtualnih elementov HTML, kjer so možni tudi atributi in vsebina elementov. Pri tem si hranite virtualni element kot JS objekt. Omogočite ustvarjanje virtualnih pod-elementov HTML v virtualnih elementih HTML. Pri tem uporabite vsebovanje JS objektov. (2%)
Izris (angl. rendering) virtualnih elementov. Vhod v izris naj bo korenski prazni element (npr. <div id="root"></div>). Pri tem si pomagajte z DOM API. (2%)
Primerjava dveh VDOM-ov (angl. diffing), pri čemer posodobimo prvi VDOM glede na spremembe v drugem VDOM. Pri tem omogočimo tudi sprotni izris za samo spremenjenje elemente, vsebino in atribute. Za sprotni izris mora seveda bit predhodni izris celotnega VDOM-a opravljen. (3%)
Z uporabo razvitega ogrodja izdelajte enostavno spletno aplikacijo za dodajanje novih ali spreminjanje obstoječih komentarjev. Ustvarite naključnih 10000 komentarjev, ki pripadajo prvem VDOM-u ter ga izrišite. Naredite kopijo danega VDOM-a, da dobite drugi VDOM ter v njem spremenite vsebino in barvo teksta naključnih X komentarjev. Nato posodobite prvi VDOM glede na spremembe drugega z operacijo diff. Izmerite čas ponovnega izrisa celotnega spremenjenega prvega VDOM-a, ali izrisa le spremenjenih komentarjev (+ upoštevanja časa operacije diff). Eksperiment ponovite pri X={10, 20, 50, 100, 300, 500). Izrišite črtni grafikon, kjer x os definira parameter X, y os pa izmerjen čas za oba možna izrisa. (5%)
Ni dovoljena uporaba zunanjih knjižnic ali ogrodij.

Primer VDOM elementa v obliki JS objekta:

{

              type: 'ol',

              props: { className: 'seznam' },

              children: [

                           { type: 'li', props: {}, children: ['1'] },

                           { type: 'li', props: {}, children: ['2'] },

                           { type: 'li', props: {}, children: ['3'] }

              ]

}

Se pri izrisu preslika v:

<ol class="seznam">
                 <li>1</li>
                 <li>2</li>
                 <li>3</li>
</ol>
  