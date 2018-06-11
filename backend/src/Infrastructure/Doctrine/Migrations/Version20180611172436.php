<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20180611172436 extends AbstractMigration
{
    public function up(Schema $schema): void {
        $table = $schema->createTable("users");
        $table->addColumn("id", "string");
        $table->addColumn("name", "string");
        $table->addColumn("pass_hash", "string");
        $table->addColumn("email_hash", "string");
        $table->setPrimaryKey(["id"]);

    }

    public function down(Schema $schema): void {
        $schema->dropTable("users");

    }
}
