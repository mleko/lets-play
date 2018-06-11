<?php declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180611180550 extends AbstractMigration
{
    public function up(Schema $schema): void {
        $table = $schema->createTable("bets");
        $table->addColumn("userId", "string");
        $table->addColumn("gameId", "string");
        $table->addColumn("matchId", "string");
        $table->addColumn("datetime", "datetime");
        $table->addColumn("away", "integer");
        $table->addColumn("home", "integer");

        $table->setPrimaryKey(["gameId", "userId", "matchId", "datetime"]);

    }

    public function down(Schema $schema): void {
        $schema->dropTable("bets");

    }
}
