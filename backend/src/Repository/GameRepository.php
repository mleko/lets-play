<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\Alchemist\Normalizer;
use Mleko\LetsPlay\Entity\Game;
use Mleko\LetsPlay\Persistence\Storage;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameRepository extends StorageRepository
{

    /** @var GameUserRepository */
    private $gameUserRepository;

    /**
     * @inheritDoc
     */
    public function __construct(Storage $storage, Normalizer $normalizer, GameUserRepository $gameUserRepository) {
        parent::__construct($storage, $normalizer);
        $this->gameUserRepository = $gameUserRepository;
    }


    public function save(Game $game) {
        $games = $this->getElements();
        $games[$game->getId()->getUuid()] = $game;
        $this->saveElements($games);
    }

    public function getGames() {
        return $this->getElements();
    }

    public function getGame(string $gameId): ?Game {
        $games = $this->getElements();
        return $games[$gameId] ?? null;
    }

    public function getUserGames(Uuid $userId) {
        $allGames = $this->getElements();
        $games = \array_filter($allGames, function (Game $game) use ($userId) {
            return $game->getOwnerId()->equals($userId);
        });
        foreach ($this->gameUserRepository->getUserGames($userId) as $userGame) {
            $gid = $userGame->getGameId()->getUuid();
            if (\array_key_exists($gid, $allGames)) {
                $games[$gid] = $allGames[$gid];
            }
        }
        return \array_values($games);
    }

    protected function getElementClassName(): string {
        return Game::class;
    }

    protected function getStorageKey(): string {
        return "games";
    }
}
