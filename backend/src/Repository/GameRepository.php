<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


class GameRepository extends StorageRepository
{

    public function save(\Mleko\LetsPlay\Entity\Game $game) {
        $games = $this->getElements();
        $games[$game->getId()->getUuid()] = $game;
        $this->saveElements($games);
    }

    public function getGames() {
        return $this->getElements();
    }

    public function getGame($gameId) {
        $games = $this->getElements();
        return $games[$gameId] ?? null;
    }

    protected function getElementClassName(): string {
        return \Mleko\LetsPlay\Entity\Game::class;
    }

    protected function getStorageKey(): string {
        return "games";
    }
}
