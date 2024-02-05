enum Symbole {
    O,
    X,
    PAS_DETAT,
}

class Morpion {
    readonly plateauDeJeu: Symbole[][]
    private constructor(plateauDeJeu: Symbole[][]) {
        this.plateauDeJeu = plateauDeJeu
    }

    static creer() {
        const plateauDeJeu = [
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
        ]
        return new Morpion(plateauDeJeu)
    }

    static reconstituer(plateauDeJeu: Symbole[][]) {
        return new Morpion(plateauDeJeu)
    }

    positionner(
        positionLigne: number,
        positionColonne: number,
        symbole: Symbole,
    ) {
        if (this.sontEnDehorsDuPlateauDeJeu(positionColonne, positionLigne))
            throw new PositionInvalide(
                `La position (${positionLigne},${positionColonne}) est invalide`,
            )
        if (this.estUneCaseDejaPrise(positionLigne, positionColonne))
            throw new PositionInvalide(
                `La position (${positionLigne},${positionColonne}) est déjà occupée`,
            )

        this.plateauDeJeu[positionLigne][positionColonne] = symbole
    }

    private estUneCaseDejaPrise(
        positionLigne: number,
        positionColonne: number,
    ) {
        return (
            this.plateauDeJeu[positionLigne][positionColonne] !=
            Symbole.PAS_DETAT
        )
    }

    private sontEnDehorsDuPlateauDeJeu(
        positionColonne: number,
        positionLigne: number,
    ) {
        return (
            this.estEnDehorsDuPlateauDeJeu(positionColonne) ||
            this.estEnDehorsDuPlateauDeJeu(positionLigne)
        )
    }

    private estEnDehorsDuPlateauDeJeu(position: number) {
        return position > 2 || position < 0
    }
}

class PositionInvalide extends Error {
    constructor(message: string) {
        super(message)
    }
}

describe('Jeu du morpion', () => {
    it("quand j'instancie la classe Morpion, alors son plateau de jeu est créé.", () => {
        // Given
        const plateauDeJeuAttendu = [
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
        ]

        // When
        const morpion = Morpion.creer()

        // Then
        expect(morpion.plateauDeJeu).toStrictEqual(plateauDeJeuAttendu)
    })

    it.each([
        {
            plateauDeJeuAttendu: [
                [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
                [Symbole.PAS_DETAT, Symbole.X, Symbole.PAS_DETAT],
                [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            ],
            ligne: 1,
            colonne: 1,
        },
        {
            plateauDeJeuAttendu: [
                [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
                [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.X],
                [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            ],
            ligne: 1,
            colonne: 2,
        },
    ])(
        'quand je place un symbole à la position ($ligne,$colonne) donnée sur le plateau de jeu, alors le plateau sauvegarde le placement du symbole à cette position.',
        ({ plateauDeJeuAttendu, ligne, colonne }) => {
            // Given
            const morpion = Morpion.creer()

            // When
            morpion.positionner(ligne, colonne, Symbole.X)

            // Then
            expect(morpion.plateauDeJeu).toStrictEqual(plateauDeJeuAttendu)
        },
    )

    it.each([
        {
            positionLigne: 1,
            positionColonne: 3,
        },
        {
            positionLigne: 1,
            positionColonne: -1,
        },
        {
            positionLigne: 3,
            positionColonne: 1,
        },
        {
            positionLigne: -1,
            positionColonne: 1,
        },
    ])(
        'quand je place un symbole en dehors du plateau de jeu ($positionLigne,$positionColonne), alors on lève une exception "PositionInvalide".',
        ({ positionLigne, positionColonne }) => {
            // Given
            const erreurAttendue = new PositionInvalide(
                `La position (${positionLigne},${positionColonne}) est invalide`,
            )
            const morpion = Morpion.creer()

            const action = () =>
                morpion.positionner(positionLigne, positionColonne, Symbole.X)

            // When
            const exception = récupérerLException(action)

            // Then
            expect(exception.name).toBe(erreurAttendue.name)
            expect(exception.message).toStrictEqual(erreurAttendue.message)
        },
    )

    it('quand je place un symbole sur une position déjà prise, alors une exception PositionInvalide est levée', () => {
        // Given
        const erreurAttendue = new PositionInvalide(
            `La position (0,0) est déjà occupée`,
        )

        const etatDuPlateauDeJeu = [
            [Symbole.X, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
        ]

        const morpion = Morpion.reconstituer(etatDuPlateauDeJeu)

        const action = () => morpion.positionner(0, 0, Symbole.X)

        // When
        const exception = récupérerLException(action)

        // Then
        expect(exception.name).toBe(erreurAttendue.name)
        expect(exception.message).toBe(erreurAttendue.message)
    })

    it('quand je place le symbole O, alors le symbole O est bien positionner', () => {
        //Given
        const plateauDeJeuAttendu = [
            [Symbole.O, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
            [Symbole.PAS_DETAT, Symbole.PAS_DETAT, Symbole.PAS_DETAT],
        ]

        const morpion = Morpion.creer()

        // when
        morpion.positionner(0, 0, Symbole.O)

        // Then
        expect(morpion.plateauDeJeu).toStrictEqual(plateauDeJeuAttendu)
    })
})

const récupérerLException = (action: () => void) => {
    try {
        action()
    } catch (error) {
        return error
    }
    throw new Error('Aucune exception levée.')
}
