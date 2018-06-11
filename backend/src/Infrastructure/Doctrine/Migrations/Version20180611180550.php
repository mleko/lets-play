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
        $table->addColumn("id", "string");
        $table->addColumn("user_id", "string");
        $table->addColumn("game_id", "string");
        $table->addColumn("match_id", "string");
        $table->addColumn("datetime", "datetime");
        $table->addColumn("away", "integer");
        $table->addColumn("home", "integer");

        $table->setPrimaryKey(["id"]);
        $table->addIndex(["game_id", "user_id", "match_id", "datetime"]);

    }

    public function down(Schema $schema): void {
        $schema->dropTable("bets");

    }
}
