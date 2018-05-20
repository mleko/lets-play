<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\LetsPlay\Entity\Game;

class GameRepository extends StorageRepository
{

    public function save(Game $game) {
        $games = $this->getElements();
        $games[$game->getId()->getUuid()] = $game;
        $this->saveElements($games);
    }

    public function getGames() {
        return $this->getElements();
    }

    public function getGame($gameId): ?Game {
        $games = $this->getElements();
        return $games[$gameId] ?? null;
    }

    protected function getElementClassName(): string {
        return Game::class;
    }

    protected function getStorageKey(): string {
        return "games";
    }
}
