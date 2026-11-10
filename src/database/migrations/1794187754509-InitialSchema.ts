import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1794187754509 implements MigrationInterface {
    name = 'InitialSchema1794187754509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`directores\` (\`IDDirector\` int NOT NULL AUTO_INCREMENT, \`Director\` varchar(150) NOT NULL, PRIMARY KEY (\`IDDirector\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categorias\` (\`Identificador\` int NOT NULL AUTO_INCREMENT, \`Categoria\` varchar(100) NOT NULL, PRIMARY KEY (\`Identificador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peliculas\` (\`Identificador\` int NOT NULL AUTO_INCREMENT, \`Titulo\` varchar(150) NOT NULL, \`Duracion\` int NOT NULL, \`Sinopsis\` text NOT NULL, \`IDDirector\` int NOT NULL, \`IDCategoria\` int NOT NULL, PRIMARY KEY (\`Identificador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`peliculas\` ADD CONSTRAINT \`FK_3a9986f279530a76b90b58c0498\` FOREIGN KEY (\`IDDirector\`) REFERENCES \`directores\`(\`IDDirector\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peliculas\` ADD CONSTRAINT \`FK_e7c28aa5ee6caefd015abb482e5\` FOREIGN KEY (\`IDCategoria\`) REFERENCES \`categorias\`(\`Identificador\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`peliculas\` DROP FOREIGN KEY \`FK_e7c28aa5ee6caefd015abb482e5\``);
        await queryRunner.query(`ALTER TABLE \`peliculas\` DROP FOREIGN KEY \`FK_3a9986f279530a76b90b58c0498\``);
        await queryRunner.query(`DROP TABLE \`peliculas\``);
        await queryRunner.query(`DROP TABLE \`categorias\``);
        await queryRunner.query(`DROP TABLE \`directores\``);
    }

}
