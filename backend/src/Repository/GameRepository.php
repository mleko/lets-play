<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

use Mleko\LetsPlay\Entity\Game;
use Mleko\LetsPlay\ValueObject\Uuid;

interface GameRepository
{
    public function save(Game $game);

    public function getGames();

    public function getGame(string $gameId): ?Game;

    public function getUserGames(Uuid $userId);
}
