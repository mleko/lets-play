<?php declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180711185919 extends AbstractMigration
{
    /**
     * @param Schema $schema
     * @throws \Doctrine\DBAL\DBALException
     * @throws \Doctrine\DBAL\Migrations\AbortMigrationException
     */
    public function up(Schema $schema): void {
        $matchSetsTable = $schema->createTable("match_sets");
        $matchSetsTable->addColumn("id", "string");
        $matchSetsTable->addColumn("owner_id", "string");
        $matchSetsTable->addColumn("public", "boolean");
        $matchSetsTable->addColumn("name", "string");
        $matchSetsTable->setPrimaryKey(["id"]);

        $matchesTable = $schema->createTable("matches");
        $matchesTable->addColumn("id", "string");
        $matchesTable->addColumn("set_id", "string");
        $matchesTable->addColumn("start_date", "datetime");
        $matchesTable->addColumn("home_name", "string");
        $matchesTable->addColumn("home_score", "integer", ["notnull" => false]);
        $matchesTable->addColumn("away_name", "string");
        $matchesTable->addColumn("away_score", "integer", ["notnull" => false]);
        $matchesTable->setPrimaryKey(["id"]);
    }

    public function down(Schema $schema): void {
        $schema->dropTable("match_sets");
        $schema->dropTable("matches");
    }
}
