# morpion-react

Un morpion fait avec react pour s'entrainer avec la bibliothèque et pratiquer le TDD (Test Driven Development). 

## Règles du morpion

Jeu qui se joue sur un damier de 3 cases par 3 cases avec 2 joueurs. Le but est d'aligner 3 symboles identiques horizontalement, verticalement ou en diagonale. Les symboles seront des "X" et "O". 

Chaque joueur joue à tour de rôle afin de placer son symbole. Il ne peut placer son symbole seulement dans un emplacement vide. Une fois placé, il ne peut le retirer.

Le premier à aligner 3 de ses symboles gagne la partie.

Si plus aucune case n'est disponible et qu'aucun joueur n'a aligné 3 symboles alors la partie est terminée et se termine par un match nul.