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
        if (this.sontEnDehorsDuPlateauDeJeu(positionColonne, positionLigne)) throw new PositionInvalide(
            `La position (${positionLigne},${positionColonne}) est invalide`,
        )

        this.plateauDeJeu[positionLigne][positionColonne] = 1
    }

    private sontEnDehorsDuPlateauDeJeu(positionColonne: number, positionLigne: number) {
        return this.estEnDehorsDuPlateauDeJeu(positionColonne) || this.estEnDehorsDuPlateauDeJeu(positionLigne);
    }

    private estEnDehorsDuPlateauDeJeu(position: number) {
        return position > 2 || position < 0
    }
}

class PositionInvalide extends Error {
    constructor(message: string) {
        super(message);
    }
}

// TODO: quand je place un symbole sur une position déjà prise, alors une exception PositionInvalide est levée
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

    it.each([
        {
            positionLigne: 1,
            positionColonne: 3
        },
        {
            positionLigne: 1,
            positionColonne: -1
        },
        {
            positionLigne: 3,
            positionColonne: 1
        },
        {
            positionLigne: -1,
            positionColonne: 1
        },
        ])(
            'quand je place un symbole en dehors du plateau de jeu ($positionLigne,$positionColonne), alors on lève une exception "PositionInvalide".', ({positionLigne,positionColonne}) => {
        // Given
        const erreurAttendue = new PositionInvalide(`La position (${positionLigne},${positionColonne}) est invalide`)
        const morpion = new Morpion()

        const action = () => morpion.positionner(positionLigne, positionColonne)

        // When
        const exception = récupérerLException(action)

        // Then
        expect(exception.name).toBe(erreurAttendue.name)
        expect(exception.message).toStrictEqual(erreurAttendue.message)
    })
})


const récupérerLException = (action: ()=> void) => {
    try {
        action()
    }
    catch (error) {
        return error
    }
    throw new Error('Aucune exception levée.')
}