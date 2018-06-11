<?php declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180611190021 extends AbstractMigration
{
    public function up(Schema $schema): void {
        $gamesTable = $schema->createTable("games");
        $gamesTable->addColumn("id", "string");
        $gamesTable->addColumn("name", "string");
        $gamesTable->addColumn("match_set_id", "string");
        $gamesTable->addColumn("owner_id", "string");
        $gamesTable->setPrimaryKey(["id"]);

        $gameUsersTable = $schema->createTable("game_users");
        $gameUsersTable->addColumn("user_id", "string");
        $gameUsersTable->addColumn("game_id", "string");
        $gameUsersTable->setPrimaryKey(["user_id", "game_id"]);

        $gameUsersTable = $schema->createTable("game_invites");
        $gameUsersTable->addColumn("id", "string");
        $gameUsersTable->addColumn("game_id", "string");
        $gameUsersTable->addColumn("status", "integer");
        $gameUsersTable->setPrimaryKey(["id"]);

    }

    public function down(Schema $schema): void {
        $schema->dropTable("games");
        $schema->dropTable("game_users");
        $schema->dropTable("game_invites");

    }
}
