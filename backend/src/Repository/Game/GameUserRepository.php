<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;


use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Repository\StorageRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameUserRepository extends StorageRepository
{

    /**
     * @param Uuid $userId
     * @return GameUser[]
     */
    public function getUserGames(Uuid $userId) {
        /** @var GameUser[] $elements */
        $elements = $this->getElements();
        return \array_filter($elements, function (GameUser $e) use ($userId) {
            return $e->getUserId()->equals($userId);
        });
    }

    protected function getElementClassName(): string {
        return GameUser::class;
    }

    protected function getStorageKey(): string {
        return "game.user";
    }
}
