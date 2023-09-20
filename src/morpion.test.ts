class Morpion {
    plateauDeJeu: number[][]
    constructor() {
        this.plateauDeJeu = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
    }

    positionner(positionLigne: number, positionColonne: number) {
        if (this.estEnDehorsDuPlateauDeJeu(positionColonne)) throw new PositionInvalide("toto")

        this.plateauDeJeu[positionLigne][positionColonne] = 1
    }

    private estEnDehorsDuPlateauDeJeu(position: number) {
        return position > 2
    }
}

class PositionInvalide extends Error {
    constructor(message: string) {
        super(message);
    }
}

describe('Jeu du morpion', () => {
    it("quand j'instancie la classe Morpion, alors son plateau de jeu est créé.", () => {
        // Given
        const plateauDeJeuAttendu = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]

        // When
        const morpion = new Morpion()

        // Then
        expect(morpion.plateauDeJeu).toStrictEqual(plateauDeJeuAttendu)
    })

    it.each([
        {
            plateauDeJeuAttendu: [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ],
            ligne: 1,
            colonne: 1,
        },
        {
            plateauDeJeuAttendu: [
                [0, 0, 0],
                [0, 0, 1],
                [0, 0, 0],
            ],
            ligne: 1,
            colonne: 2,
        },
    ])(
        'quand je place un symbole à la position ($ligne,$colonne) donnée sur le plateau de jeu, alors le plateau sauvegarde le placement du symbole à cette position.',
        ({ plateauDeJeuAttendu, ligne, colonne }) => {
            // Given
            const morpion = new Morpion()

            // When
            morpion.positionner(ligne, colonne)

            // Then
            expect(morpion.plateauDeJeu).toStrictEqual(plateauDeJeuAttendu)
        },
    )

    it('quand je place un symbole en dehors du plateau de jeu, alors on leve une exception "PositionInvalide".', () => {
        // Given
        const erreurAttendue = new PositionInvalide("toto") // TODO: changer le message et reprendre à partir d'ici
        const morpion = new Morpion()

        // When
        try {
            morpion.positionner(1, 3)
        }
        catch (error) {
            // Then
            expect(error).toBeInstanceOf(PositionInvalide)
            expect(error).toStrictEqual(erreurAttendue)
        }


    })
})
